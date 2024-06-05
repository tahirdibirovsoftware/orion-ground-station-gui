import { existsSync, mkdirSync } from 'fs';
import { orionPath, recordingsPath, outputPath, telemetryPath, chunksPath, statePath, videoPath, documentPath, cachePath } from './paths';



export const initBaseDir = (): Array<string | void> =>{

    const directories = [orionPath, recordingsPath, outputPath, telemetryPath, chunksPath, statePath, videoPath, telemetryPath, documentPath, cachePath]
    return directories.map(directory => !existsSync(directory) ? mkdirSync(directory): directory)

}