/* eslint-disable @typescript-eslint/no-explicit-any */
import * as sqlite3 from 'sqlite3';
import { Workbook } from 'exceljs';

/**
 * Converts an SQLite database to an Excel file.
 * @param sqliteFilePath - The path to the SQLite database file.
 * @param excelFilePath - The path to save the generated Excel file.
 * @returns A promise that resolves when the Excel file is created.
 */
export async function convertSQLiteToExcel(sqliteFilePath: string, excelFilePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(sqliteFilePath, (err) => {
      if (err) {
        reject(new Error(`Error connecting to the database: ${err.message}`));
        return;
      }
    });

    db.serialize(() => {
      db.all('SELECT * FROM FLIGHT_DATA', async (err, rows: any[]) => {
        if (err) {
          reject(new Error(`Error querying the database: ${err.message}`));
          return;
        }

        if (rows.length === 0) {
          reject(new Error('No data found in the table.'));
          return;
        }

        try {
          const workbook = new Workbook();
          const worksheet = workbook.addWorksheet('Sheet1');

          // Add column headers excluding the first column
          const headers = Object.keys(rows[0]).slice(1);
          worksheet.columns = headers.map((key) => ({
            header: key,
            key,
          }));

          // Add rows excluding the first column
          rows.forEach((row) => {
            const rowData = headers.map((key) => row[key]);
            worksheet.addRow(rowData);
          });

          // Save the workbook to a file
          await workbook.xlsx.writeFile(excelFilePath);
          resolve();
        } catch (writeErr: any) {
          reject(new Error(`Error writing Excel file: ${writeErr.message}`));
        } finally {
          db.close((closeErr) => {
            if (closeErr) {
              console.error(`Error closing the database: ${closeErr.message}`);
            }
          });
        }
      });
    });
  });
}
