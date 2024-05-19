import { IIoTTelemetry, ITelemetry } from "src/global/types/types";

export interface ISatController {
    flightData: Array<ITelemetry>,
    iotData: Array<IIoTTelemetry>,
}