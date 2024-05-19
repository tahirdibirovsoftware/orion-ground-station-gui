import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { SerialPort } from 'serialport';
import { IIoTTelemetry, ITelemetry } from '../global/types/types';

type SerialPortListType = Awaited<ReturnType<typeof SerialPort.list>>;

const api = {
  getPortList: async (): Promise<SerialPortListType> => await ipcRenderer.invoke('port-list'),
  onPortListUpdated: (callback: (ports: SerialPortListType) => void): void => {
    ipcRenderer.on('port-list-updated', async (_, ports: Promise<ReturnType<typeof SerialPort.list>>) => {
      const resolvedPorts = await ports; // Await the promise directly
      callback(resolvedPorts);
    });
  },
  connectToFlight: (path: string, baudRate: number): void => {
    console.log('Sending connect-to-flight event');
    console.log(`Path: ${path}, BaudRate: ${baudRate}`);
    ipcRenderer.send('connect-to-flight', { path, baudRate });
  },
  getFlightData: (callback: (data: ITelemetry) => void): void => {
    ipcRenderer.on('flight-data', (_, data) => callback(data));
  },
  disconnectFlight: (path: string): void => ipcRenderer.send('disconnect-flight', { path }),
  connectToIot: (path: string, baudRate: number): void => {
    ipcRenderer.send('connect-to-iot', { path, baudRate });
  },
  getIotData: (callback: (data: IIoTTelemetry) => void): void => {
    ipcRenderer.on('iot-data', (_, data) => callback(data));
  },
  disconnectIot: (path: string): void => ipcRenderer.send('disconnect-iot', { path }),
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.electron = electronAPI;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.api = api;
}

declare global {
  interface Window {
    api: typeof api;
  }
}
