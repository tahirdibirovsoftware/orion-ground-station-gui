import { ITelemetry, SatStatus } from "../model/types";

const MAX_TEMPERATURE = 40; // Celsius
const MAX_HUMIDITY = 90; 
const MAX_PRESSURE = 1200; // Assume units
const MAX_ALTITUDE = 5000; // Meters
const MAX_DESCENT_RATE = 50; // Meters per second
const MAX_VOLTAGE = 5; // Volts
const LATITUDE_RANGE = [-90, 90]; 
const LONGITUDE_RANGE = [-180, 180];

export function generateMockTelemetryData(): Array<ITelemetry> {
  const telemetryData: Array<ITelemetry> = [];

  for (let i = 0; i < 30; i++) {
    telemetryData.push({
      packetNumber: i + 1,
      satelliteStatus: Math.floor(Math.random() * 6) as SatStatus, // Random status 0-5
      errorCode: Math.floor(Math.random() * 100), 
      missionTime: new Date(), // Current time, adjust if needed
      pressure1: Math.random() * MAX_PRESSURE,
      pressure2: Math.random() * MAX_PRESSURE,
      altitude1: Math.random() * MAX_ALTITUDE,
      altitude2: Math.random() * MAX_ALTITUDE,
      altitudeDifference: Math.abs((Math.random() * MAX_ALTITUDE) - (Math.random() * MAX_ALTITUDE)),
      descentRate: Math.random() * MAX_DESCENT_RATE,
      temp: Math.random() * MAX_TEMPERATURE,
      voltageLevel: Math.random() * MAX_VOLTAGE,
      gps1Latitude: LATITUDE_RANGE[0] + Math.random() * (LATITUDE_RANGE[1] - LATITUDE_RANGE[0]),
      gps1Longitude: LONGITUDE_RANGE[0] + Math.random() * (LONGITUDE_RANGE[1] - LONGITUDE_RANGE[0]),
      gps1Altitude: Math.random() * MAX_ALTITUDE,
      pitch: Math.random() * 360 - 180, // -180 to 180 degrees
      roll: Math.random() * 360 - 180,
      YAW: Math.random() * 360 - 180, // -180 to 180 degrees
      iotData: Math.random() < 0.5 ? { // 50% chance of having IoT data
      temperature: Math.random() * MAX_TEMPERATURE,
      humidity: Math.random() * MAX_HUMIDITY 
      } : 0,
      teamId: 1 // Replace with your desired team ID
    });
  }

  return telemetryData;
}

const mockData = generateMockTelemetryData();
console.log(mockData);