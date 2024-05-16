import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { portlist } from './PortConfig/lib/portList';
import udev from 'udev';
import { flightPortStarter } from './PortConfig/lib/flightPortManagement';

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.maximize();
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  ipcMain.handle('port-list', async () => {
    return await portlist();
  });

  ipcMain.on('connect-to-flight', (event, { path, baudRate }) => {
    const port = flightPortStarter(baudRate, path, (data)=>{
        event.sender.send('flight-data', data)
    })
    ipcMain.on('disconnect-flight', ()=>port.close())
    });
  });

  const monitor = udev.monitor();
  monitor.on('add', async () => {
    const ports = await portlist();
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send('port-list-updated', ports);
    });
  });

  monitor.on('remove', async () => {
    const ports = await portlist();
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send('port-list-updated', ports);
    });
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
