import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ITelemetry } from '../../../../../global/types/types';

export const initialState: Array<ITelemetry> = [];

const dataStoreSlice = createSlice({
    name: 'dataStoreSlice',
    initialState,
    reducers: {
        addTelemetry: (state, action: PayloadAction<ITelemetry>) => {
            state.push(action.payload);
        },
        // Add more reducers as needed
    },
});

export const { addTelemetry } = dataStoreSlice.actions;
export default dataStoreSlice.reducer;
