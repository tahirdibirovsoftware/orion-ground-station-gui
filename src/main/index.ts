import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { portlist } from './PortConfig/lib/portList';
import udev from 'udev';
import { flightPortStarter, attachDbWriter, detachDbWriter } from './PortConfig/lib/flightPortManagement';
import { IIoTTelemetry, ITelemetry } from '../global/types/types';
import { iotPortStarter } from './PortConfig/lib/iotPortManagement';
import { serialize } from './PortConfig/lib/serializers';
import { initBaseDir } from './common/dirConfig';
import { initializeDb } from './DbConfig';

initBaseDir();
const db = initializeDb();

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

  createWindow();

  ipcMain.handle('port-list', async () => {
    return await portlist();
  });

  const flightPorts = new Map();
  const iotPorts = new Map();

  ipcMain.on('connect-to-flight', (event, data) => {
    if (!data || !data.path || !data.baudRate) {
      console.error('Invalid connect-to-flight data:', data);
      return;
    }
    const { path, baudRate } = data;
    let port;
    if (flightPorts.has(path)) {
      port = flightPorts.get(path);
      if (port.isOpen) {
        port.close();
      }
    }
    port = flightPortStarter(baudRate, path, (data: ITelemetry) => {
      event.sender.send('flight-data', data);
    });
    flightPorts.set(path, port);
  });

  ipcMain.on('disconnect-flight', (_, data) => {
    if (!data || !data.path) {
      console.error('Invalid disconnect-flight data:', data);
      return;
    }
    const { path } = data;
    if (flightPorts.has(path)) {
      const port = flightPorts.get(path);
      if (port.isOpen) {
        port.close();
      }
      flightPorts.delete(path);
    }
  });

  ipcMain.on('connect-to-iot', (event, data) => {
    if (!data || !data.path || !data.baudRate) {
      console.error('Invalid connect-to-iot data:', data);
      return;
    }
    const { path, baudRate } = data;
    let port;
    if (iotPorts.has(path)) {
      port = iotPorts.get(path);
      if (port.isOpen) {
        port.close();
      }
    }
    port = iotPortStarter(baudRate, path, (data: IIoTTelemetry) => {
      event.sender.send('iot-data', data);
    });
    iotPorts.set(path, port);
  });

  ipcMain.on('disconnect-iot', (_, data) => {
    if (!data || !data.path) {
      console.error('Invalid disconnect-iot data:', data);
      return;
    }
    const { path } = data;
    if (iotPorts.has(path)) {
      const port = iotPorts.get(path);
      if (port.isOpen) {
        port.close();
      }
      iotPorts.delete(path);
    }
  });

  ipcMain.on('sent-parachute-data', (_, { data, path }) => {
    const port = flightPorts.get(path);
    if (port) {
      port.write(serialize(data));
    }
    return;
  });

  ipcMain.on('sent-iot-data', (_, { data, path }) => {
    const port = flightPorts.get(path);
    if (port) {
      port.write(serialize(data));
    }
    return;
  });

  ipcMain.on('sent-mfm-data', (_, { data, path }) => {
    const port = flightPorts.get(path);
    if (port) {
      port.write(serialize(data));
    }
    return;
  });

  // Database Configuration
  ipcMain.on('start-db-writing', async (_, data: { baudRate: number, path: string }) => {
    if (!data || !data.baudRate || !data.path) return;
    const { path } = data;
    if (!flightPorts.has(path)) {
      console.error('Port not connected:', path);
      return;
    }
    const port = flightPorts.get(path);
    attachDbWriter(port, await db);
  });

  ipcMain.on('stop-db-writing', async (_, { path }) => {
    if (!flightPorts.has(path)) {
      console.error('Port not connected:', path);
      return;
    }
    const port = flightPorts.get(path);
    detachDbWriter(port);
    (await db).run(`DELETE FROM FLIGHT_DATA`);
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
});
