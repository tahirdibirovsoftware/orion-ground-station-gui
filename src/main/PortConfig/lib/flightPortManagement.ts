import { ReadlineParser, SerialPort } from "serialport";
import { flightDataParser } from "./parsers";
import { Database } from "sqlite";
import { flightQuery, flightQueryData } from "../../DbConfig/queries";
import { ITelemetry } from "../../../global/types/types";

export const flightPortStarter = (baudRate: number, path: string, callback): SerialPort => {
  console.log('Main', baudRate);
  const flightPort = new SerialPort({ baudRate, path });
  const parser = flightPort.pipe(new ReadlineParser());
  parser.on('data', (data: string) => {
    callback(flightDataParser(data, '*'));
  });
  return flightPort;
};

export const attachDbWriter = (port: SerialPort, db: Database): void => {
  const parser = port.pipe(new ReadlineParser());

  const dbWriter = async (data: string):Promise<void> => {
    const telemetryData = flightDataParser(data, '*') as ITelemetry;
    await db.run(flightQuery, flightQueryData(telemetryData));
  };

  parser.on('data', dbWriter);

  port.on('close', () => {
    parser.removeListener('data', dbWriter);
  });
};

export const detachDbWriter = (port: SerialPort): void => {
  const parser = port.pipe(new ReadlineParser());
  parser.removeAllListeners('data');
};
