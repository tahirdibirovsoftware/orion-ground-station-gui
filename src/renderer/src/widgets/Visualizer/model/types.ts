import { IIoTTelemetry, ITelemetry } from "src/global/types/types";

export interface IVisualizer {
    flightData: Array<ITelemetry>;
    iotData?: Array<IIoTTelemetry>

}