import { SerialPort } from 'serialport';

// Use ReturnType to infer the type of SerialPort.list()
export const portlist = async (): Promise<ReturnType<typeof SerialPort.list>> => {
    return await SerialPort.list();
};
