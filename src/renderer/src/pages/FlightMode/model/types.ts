import { IIoTTelemetry, ITelemetry } from "src/global/types/types";

export interface IFlight{
    flightData: Array<ITelemetry>,
    iotData: Array<IIoTTelemetry>
}
