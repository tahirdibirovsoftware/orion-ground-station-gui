import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { SerialPort } from 'serialport';
import { IIoTTelemetry, ITelemetry } from '../global/types/types';

const api = {
  getPortList: async (): Promise<ReturnType<typeof SerialPort.list>> => await ipcRenderer.invoke('port-list'),
  onPortListUpdated: (callback: (ports: ReturnType<typeof SerialPort.list>) => void): void => {
    ipcRenderer.on('port-list-updated', (_, ports) => callback(ports));
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
  // @ts-ignore
  window.electron = electronAPI;
  // @ts-ignore
  window.api = api;
}

// Extend the window interface with the api object
declare global {
  interface Window {
    api: typeof api;
  }
}
