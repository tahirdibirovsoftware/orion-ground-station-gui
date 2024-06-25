import { resolve } from "path"
import { homedir } from "os"

const orionPath = resolve(homedir(), 'orion')
const recordingsPath = resolve(orionPath, 'recordings')
const chunksPath = resolve(recordingsPath, 'chunks')
const statePath = resolve(recordingsPath, 'state')
const telemetryPath = resolve(orionPath, 'telemetry')
const cachePath = resolve(telemetryPath, 'cache')
const outputPath = resolve(orionPath, 'output')
const videoPath = resolve(outputPath, 'video')
const documentPath = resolve(outputPath, 'document')
const sqlitePath = resolve(cachePath, 'telemetry.sqlite')
const excelPath  = resolve(documentPath, `orion-teknofest-${new Date().toLocaleTimeString().split(/:| /).join('-')}.xlsx`)

export {
    orionPath,
    recordingsPath,
    chunksPath,
    statePath,
    telemetryPath,
    cachePath,
    outputPath,
    videoPath,
    documentPath,
    sqlitePath,
    excelPath
}