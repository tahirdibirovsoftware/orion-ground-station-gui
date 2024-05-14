import { SerialPort } from 'serialport';

type SerialPortListType = Awaited<ReturnType<typeof SerialPort.list>>;

// Function to get the port list
export const portlist = async (): Promise<SerialPortListType> => {
  return await SerialPort.list();
};
