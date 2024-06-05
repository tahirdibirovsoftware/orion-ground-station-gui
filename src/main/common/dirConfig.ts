import { existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { resolve } from 'path';



export const initBaseDir = (): Array<string | void> =>{
    
    const orionPath = resolve(homedir(), 'orion')
    const recordingsPath = resolve(orionPath, 'recordings')
    const chunksPath = resolve(recordingsPath, 'chunks')
    const statePath = resolve(recordingsPath, 'state')
    const savedPath = resolve(recordingsPath, 'saved')
    const telemetryPath = resolve(orionPath, 'telemetry')
    const documentsPath = resolve(telemetryPath, 'documents')
    const cachePath = resolve(telemetryPath, 'cache')

    const directories = [orionPath, recordingsPath, chunksPath, statePath, savedPath, telemetryPath, documentsPath, cachePath]
    return directories.map(directory => !existsSync(directory) ? mkdirSync(directory): directory)

}