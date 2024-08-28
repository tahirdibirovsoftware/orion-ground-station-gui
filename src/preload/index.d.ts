import { SerialPort } from 'serialport';

declare global {
  interface Window {
    api: {
      getPortList: () => Promise<ReturnType<typeof SerialPort['list']>>;
      onPortListUpdated: (callback: (ports: Awaited<ReturnType<typeof SerialPort['list']>>) => void) => void;
      connectToFlight: (path: string, baudRate: number) => void;
      getFlightData: (callback: (data: ITelemetry) => void) => void;
      disconnectFlight: (path: string) => void;
      connectToIot: (path: string, baudRate: number) => void;
      getIotData: (callback: (data: IIoTTelemetry) => void) => void;
      disconnectIot: (path: string) => void;
      controlTheParachute: (data: string, path: string) => void;
      sendIotData: (data: string, path: string) => void;
      controlTheMfm: (data: string, path: string) => void;
      startDbWriting: (path:string, baudRate: number) => void,
      stopDbWriting: (path: string)=>void,
      openOuputFiles: ()=>void,
      getNetworkState: (setter)=>void
    };
  }
}

export {};
