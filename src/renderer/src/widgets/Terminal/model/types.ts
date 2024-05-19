import { ITelemetry } from "src/global/types/types";

export interface ITerminal{
    mode: 'full' | 'demo';
    flightData: Array<ITelemetry>;
}