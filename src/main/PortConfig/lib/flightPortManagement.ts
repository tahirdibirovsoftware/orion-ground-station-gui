import { ReadlineParser, SerialPort } from "serialport";
import { flightDataParser } from "./parsers";
import { Database } from "sqlite";
import { flightQuery, flightQueryData } from "../../DbConfig/queries";
import { ITelemetry } from "../../../global/types/types";
import httpService from "../../httpConfig/httpService";



export const flightPortStarter = (baudRate: number, path: string, callback, db: Database): SerialPort => {
  console.log('Main', baudRate);
  const flightPort = new SerialPort({ baudRate, path });
  const parser = flightPort.pipe(new ReadlineParser());
  parser.on('data', async (data: string) => {
    const telemetryData = flightDataParser(data, '*') as ITelemetry;
    callback(telemetryData);
    db.run(flightQuery, flightQueryData(telemetryData));
    httpService.transmitData(telemetryData)
  });
  flightPort.on('close', ()=>{
    parser.removeAllListeners()
  })
  return flightPort;
};
