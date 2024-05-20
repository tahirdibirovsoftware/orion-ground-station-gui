import { IIoTTelemetry, ITelemetry } from "src/global/types/types";

export interface IMode {
    flightData: Array<ITelemetry>;
    iotData: Array<IIoTTelemetry>
}