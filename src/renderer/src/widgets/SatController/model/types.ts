import { IIoTTelemetry, ITelemetry } from "src/global/types/types";

export interface ISatController {
    flightData: Array<ITelemetry>;
    iotData: Array<IIoTTelemetry>;
}

export interface IControllingData {
    parachuteState: 0 | 1;
    iot: number;
    mfm: string;
}