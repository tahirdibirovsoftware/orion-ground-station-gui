import { IIoTTelemetry, ITelemetry, SatStatus } from "../../../global/types/types";

export const flightDataParser = (data: string, delimiter: string): ITelemetry | string => {
    try {
        const splittedTelemetry = data.split(delimiter);
        if (splittedTelemetry.length < 21) {
            throw new Error('Insufficient data fields');
        }
        const jsonFlightTelemetry: ITelemetry = {
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
        };
        return jsonFlightTelemetry;
    } catch (error) {
        return `Error: ${(error as Error).message}`;
    }
};

export const iotDataParser = (data: string, delimiter: string): IIoTTelemetry => {
    try {
        const splittedIotData = data.split(delimiter);
        if (splittedIotData.length < 2) {
            throw new Error('Insufficient data fields');
        }
        const jsonIotTelemetry: IIoTTelemetry = {
            temperature: Number(splittedIotData[0]),
            humidity: Number(splittedIotData[1])
        };
        return jsonIotTelemetry;
    } catch (error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
};
