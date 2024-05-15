import { ReadlineParser, SerialPort } from "serialport";
import { ITelemetry, SatStatus } from '../../../global/types/types'

const mockTelemetry = '154*0*11111*0:0:2000:0:0:0*1008.78*0.00*10.13*0.00*10.13*9.93*22.41*8.40*0.000000*0.000000*0.00*59.77*101.63*181.80*0N0N*0.00*488776'

export const dataParser = (data: string, delimetr: string): ITelemetry | string => {


    try{
        const splittedTelemetry = data.split(delimetr)
        const jsonTelemetry: ITelemetry = {
    
            packetNumber: Number(splittedTelemetry[0]),
            satelliteStatus: Number(splittedTelemetry[1]) as SatStatus,
            errorCode: Number(splittedTelemetry[2]),
            missionTime: splittedTelemetry[3],
            pressure1: Number(splittedTelemetry[4]),
            pressure2: Number(splittedTelemetry[5]),
            altitude1: Number(splittedTelemetry[6]),
            altitude2: Number(splittedTelemetry[7]),
            altitudeDifference: Number(splittedTelemetry[8]),
            descentRate: Number(splittedTelemetry[9]),
            temp: Number(splittedTelemetry[10]),
            voltageLevel: Number(splittedTelemetry[11]),
            gps1Latitude: Number(splittedTelemetry[12]),
            gps1Longitude: Number(splittedTelemetry[13]),
            gps1Altitude: Number(splittedTelemetry[14]),
            pitch: Number(splittedTelemetry[15]),
            roll: Number(splittedTelemetry[16]),
            YAW: Number(splittedTelemetry[17]),
            LNLN: splittedTelemetry[18],
            iotData: Number(splittedTelemetry[19]),
            teamId: Number(splittedTelemetry[20])
    
    
        }
        return jsonTelemetry
    }catch(error){
        return new Error('Corrupted Data | Hatalı Veri').message
    }


}


const flightPortStarter = (baudRate: number, path: string): void => {

    const flightPort = new SerialPort({ baudRate, path })
    const parser = flightPort.pipe(new ReadlineParser())
    parser.on('data', (data) => {
        console.log(dataParser(data, '*'))
    })

}

flightPortStarter(57600, '/dev/ttyUSB0')