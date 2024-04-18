import { ITelemetry } from "@renderer/shared/model/types";

export interface ITerminal {
    mode: 'full' | 'preview',
    data: Array<ITelemetry>
}