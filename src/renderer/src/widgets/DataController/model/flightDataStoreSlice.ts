import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ITelemetry } from '../../../../../global/types/types';

export const initialState: Array<ITelemetry> = [];

const flightDataStoreSlice = createSlice({
    name: 'flightDataStoreSlice',
    initialState,
    reducers: {
        addTelemetry: (state, action: PayloadAction<ITelemetry>) => {
            state.push(action.payload);
        },
        // Add more reducers as needed
    },
});

export const { addTelemetry } = flightDataStoreSlice.actions;
export default flightDataStoreSlice.reducer;
