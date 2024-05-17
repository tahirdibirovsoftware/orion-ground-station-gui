import { SerialPort } from 'serialport';

declare global {
  interface Window {
    api: {
      getPortList: () => Promise<ReturnType<typeof SerialPort['list']>>;
      onPortListUpdated: (callback: (ports: ReturnType<typeof SerialPort['list']>) => void) => void;
      connectToFlight: (path: string, baudRate: number) => void,
      getFlightData: (callback)=>void,
      disconnectFlight: (path: string)=>void,
      connectToIot: (path: string, baudRate: number)=> void,
      getIotData: (callback: (data: IIoTTelemetry) => void) => void,
      disconnectIot: (path: string)=> void
    };
  }
}

export {};
