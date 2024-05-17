import { ReadlineParser, SerialPort } from "serialport";
import { flightDataParser } from "./parsers";

// const mockTelemetry = '154*0*11111*0:0:2000:0:0:0*1008.78*0.00*10.13*0.00*10.13*9.93*22.41*8.40*0.000000*0.000000*0.00*59.77*101.63*181.80*0N0N*0.00*488776'



export const flightPortStarter = (baudRate: number, path: string, callback): SerialPort => {
  console.log('Main', baudRate)
    const flightPort = new SerialPort({ baudRate, path })
    const parser = flightPort.pipe(new ReadlineParser())
   parser.on('data', (data: string) => {
        callback(flightDataParser(data, '*'))
    })
    return flightPort
}

//  flightPortStarter(57600, '/dev/ttyACM0', console.log)