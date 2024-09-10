import { ReadlineParser, SerialPort } from "serialport";
import { iotDataParser } from "./parsers";




export const iotPortStarter = (baudRate: number, path: string, callback): SerialPort => {
    const port = new SerialPort({ baudRate, path })
    const parser = port.pipe(new ReadlineParser())
    parser.on('data', (data: string) => {
        callback(iotDataParser(data, "*"))
    })
    return port
}