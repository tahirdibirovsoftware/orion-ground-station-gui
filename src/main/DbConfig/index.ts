import { existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { dirname, resolve } from 'path';
import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';

const dbPath = resolve(homedir(), 'orion', 'telemetry', 'cache');

export const initializeDb = async (): Promise<Database> => {
  // Ensure the directory exists
  const dir = dirname(dbPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const dbExists = existsSync(resolve(dbPath, 'telemetry.sqlite'));
  const db = await open({
    filename: resolve(dbPath, 'telemetry.sqlite'),
    driver: sqlite3.Database,
  });

  if (!dbExists) {
    await db.exec(`
      CREATE TABLE FLIGHT_DATA (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        packetNumber INT,
        satelliteStatus INT,
        errorCode TEXT,
        missionTime TEXT,
        pressure1 REAL,
        pressure2 REAL,
        altitude1 REAL,
        altitude2 REAL,
        altitudeDifference REAL,
        descentRate REAL,
        temp REAL,
        voltageLevel REAL,
        gps1Latitude REAL,
        gps1Longitude REAL,
        gps1Altitude REAL,
        pitch REAL,
        roll REAL,
        yaw REAL,
        lnln TEXT,
        iotData REAL,
        teamId INT
      )
    `);
    console.log('Database has been initialized');
  } else {
    console.log('Database already exists');
  }

  return db;
};



export const clearSQLite = (database: Database): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    console.log('Starting data deletion from FLIGHT_DATA table.');
    try {
      database.run('DELETE FROM FLIGHT_DATA');
      console.log('Data deletion query executed successfully.');
      resolve();
    } catch (err) {
      console.error('Error deleting data:', err);
      reject(err);
    }
  });
};





