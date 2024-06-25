import { ITelemetry } from "src/global/types/types";

export interface ITimer {
    size?: number,
    flightData: Array<ITelemetry>
}