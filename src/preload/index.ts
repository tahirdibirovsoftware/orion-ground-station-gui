/* eslint-disable @typescript-eslint/ban-ts-comment */
import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { SerialPort } from 'serialport';
import { ITelemetry } from '../global/types/types';

const api = {
  getPortList: (): Promise<ReturnType<typeof SerialPort.list>> => ipcRenderer.invoke('port-list'),
  onPortListUpdated: (callback: (ports: ReturnType<typeof SerialPort.list>) => void): void => {
    ipcRenderer.on('port-list-updated', (event, ports) => callback(ports));
  },
  connectToFlight: (path: string, baudRate: number): void => {
    console.log('Sending connect-to-flight event');
    console.log(`Path: ${path}, BaudRate: ${baudRate}`);
    ipcRenderer.send('connect-to-flight', { path, baudRate });
  },
  getFlightData: (callback: (data: ITelemetry) => void): void => {
    ipcRenderer.on('flight-data', (event, data) => callback(data));
  },
  disconnectFlight: ():void=>ipcRenderer.send('disconnect-flight')
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
