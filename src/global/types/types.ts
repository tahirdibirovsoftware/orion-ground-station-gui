export type SatStatus = 
0 |
1 |
3 |
4 |
5 

interface IIoTData {
temperature?: number,
humidity? : number
}

export interface ITelemetry{

packetNumber: number,
satelliteStatus: SatStatus,
errorCode: number,
missionTime: Date | string,
pressure1: number,
pressure2: number,
altitude1: number,
altitude2: number,
altitudeDifference: number,
descentRate: number,
temp: number,
voltageLevel: number,
gps1Latitude: number,
gps1Longitude: number,
gps1Altitude: number,
pitch: number,
roll: number,
YAW: number,
LNLN: string,
iotData: IIoTData | number
teamId: number
}

export interface IIoTTelemetry {
    temperature: number,
    humidity: number
}