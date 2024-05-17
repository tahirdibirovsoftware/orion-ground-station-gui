import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ITelemetry } from '../../../../../global/types/types';
import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const initialState: Array<ITelemetry> = [];

export const persistedFlightDataStoreSliceConfig:PersistConfig<Array<ITelemetry>> = {
    key: 'flightDataStoreSlice',
    storage
}

const persistedFlightDataStoreSlice = createSlice({
    name: 'persistedFlightDataStoreSlice',
    initialState,
    reducers: {
        addPersistedTelemetry: (_, action: PayloadAction<Array<ITelemetry>>) => {
            return action.payload;
        },
        // Add more reducers as needed
    },
});

export const { addPersistedTelemetry } = persistedFlightDataStoreSlice.actions;
export default persistedFlightDataStoreSlice.reducer;
