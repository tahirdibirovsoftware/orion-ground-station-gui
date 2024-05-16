import { SerialPort } from 'serialport';

declare global {
  interface Window {
    api: {
      getPortList: () => Promise<ReturnType<typeof SerialPort['list']>>;
      onPortListUpdated: (callback: (ports: ReturnType<typeof SerialPort['list']>) => void) => void;
      connectToFlight: (path: string, baudRate: number) => void,
      getFlightData: (callback)=>void,
      disconnectFlight: ()=>void
    };
  }
}

export {};
