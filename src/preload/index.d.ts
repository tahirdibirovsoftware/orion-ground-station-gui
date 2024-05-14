import { ElectronAPI } from '@electron-toolkit/preload'

interface IApi {
  getPortList: ()=> Promise<ReturnType<typeof SerialPort.list>>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: IApi
  }
}
