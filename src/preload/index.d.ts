import { ElectronAPI } from '@electron-toolkit/preload'

interface IApi {
  getPortList: ()=> Promise<ReturnType<typeof SerialPort.list>>,
  onPortListUpdated: (callback: (ports: ReturnType<typeof SerialPort.list>) => void)=>void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: IApi
  }
}
