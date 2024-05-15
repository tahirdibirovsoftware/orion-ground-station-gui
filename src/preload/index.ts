import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { SerialPort } from 'serialport'
import { ITelemetry } from '../global/types/types';

// Custom APIs for renderer
const api = {
  getPortList: (): Promise<ReturnType<typeof SerialPort.list>>=>ipcRenderer.invoke('port-list'),
  onPortListUpdated: (callback: (ports: ReturnType<typeof SerialPort.list>) => void):void => {
    ipcRenderer.on('port-list-updated', (event, ports) => callback(ports));
  },
  connectToFlight: (path:string, baudRate:number):Promise<ITelemetry> => ipcRenderer.invoke('connect-to-flight', {path, baudRate})
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
