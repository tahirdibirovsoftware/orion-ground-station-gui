import { ReadlineParser, SerialPort } from "serialport";
import { flightDataParser } from "./parsers";
import { Database } from "sqlite";
import { flightQuery, flightQueryData } from "../../DbConfig/queries";
import { ITelemetry } from "../../../global/types/types";
import httpService from "../../httpConfig/httpService";
import { log } from "console";



export const flightPortStarter = (baudRate: number, path: string, callback, db: Database, isDbOpened: boolean): SerialPort => {
  console.log('Main', baudRate);
  const flightPort = new SerialPort({ baudRate, path });
  const parser = flightPort.pipe(new ReadlineParser());
  parser.on('data', async (data: string) => {
    const telemetryData = flightDataParser(data, '*') as ITelemetry;
    callback(telemetryData);
    if (!isDbOpened) { db.open() }
    db.run(flightQuery, flightQueryData(telemetryData)).then(() => log("SQLite success"));
    httpService.transmitData(telemetryData)
  });
  flightPort.on('close', () => {
    parser.removeAllListeners()
  })
  return flightPort;
};
