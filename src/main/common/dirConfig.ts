import { existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { resolve } from 'path';



export const initBaseDir = (): Array<string | void> =>{
    
    const orionPath = resolve(homedir(), 'orion')
    const recordingsPath = resolve(orionPath, 'recordings')
    const chunksPath = resolve(recordingsPath, 'chunks')
    const statePath = resolve(recordingsPath, 'state')
    const telemetryPath = resolve(orionPath, 'telemetry')
    const cachePath = resolve(telemetryPath, 'cache')
    const outputPath = resolve(orionPath, 'output')
    const videoPath = resolve(outputPath, 'video')
    const documentPath = resolve(outputPath, 'document')

    const directories = [orionPath, recordingsPath, outputPath, telemetryPath, chunksPath, statePath, videoPath, telemetryPath, documentPath, cachePath]
    return directories.map(directory => !existsSync(directory) ? mkdirSync(directory): directory)

}