import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ITelemetry } from '../../../../../global/types/types';


export const initialState: Array<ITelemetry> = [
    {
        packetNumber: 0,
        satelliteStatus: 0,
        errorCode: '*****',
        missionTime: "",
        pressure1: 0,
        pressure2: 0,
        altitude1: 0,
        altitude2: 0,
        altitudeDifference: 0,
        descentRate: 0,
        temp: 0,
        voltageLevel: 0,
        gps1Latitude: 0,
        gps1Longitude: 0,
        gps1Altitude: 0,
        pitch: 0,
        roll: 0,
        YAW: 0,
        LNLN: "",
        iotData: 0,
        teamId: 0
    }
];

const flightDataStoreSlice = createSlice({
    name: 'flightDataStoreSlice',
    initialState,
    reducers: {
        addTelemetry: (state, action: PayloadAction<ITelemetry>) => {
            state.push(action.payload);
        },
        resetTelemetry: ()=>initialState
        // Add more reducers as needed
    },
});

export const { addTelemetry, resetTelemetry } = flightDataStoreSlice.actions;
export default flightDataStoreSlice.reducer;
