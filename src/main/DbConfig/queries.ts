import { ITelemetry } from "../../global/types/types"

export const flightQuery = `INSERT INTO FLIGHT_DATA (
      packetNumber, satelliteStatus, errorCode, missionTime, pressure1, pressure2,
      altitude1, altitude2, altitudeDifference, descentRate, temp, voltageLevel,
      gps1Latitude, gps1Longitude, gps1Altitude, pitch, roll, yaw, lnln, iotData, teamId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`


export  const flightQueryData = (data: ITelemetry):Array<unknown> => {

   return [
      data.packetNumber,
      data.satelliteStatus,
      data.errorCode,
      data.missionTime,
      data.pressure1,
      data.pressure2,
      data.altitude1,
      data.altitude2,
      data.altitudeDifference,
      data.descentRate,
      data.temp,
      data.voltageLevel,
      data.gps1Latitude,
      data.gps1Longitude,
      data.gps1Altitude,
      data.pitch,
      data.roll,
      data.YAW,
      data.LNLN,
      data.iotData,
      data.teamId
    ]

}