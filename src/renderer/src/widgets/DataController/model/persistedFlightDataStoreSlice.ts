import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ITelemetry } from '../../../../../global/types/types';
import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface IPersistedFlightData {
    flightData: Array<ITelemetry>
}

export const initialState: IPersistedFlightData = {
    flightData: []
};

export const persistedFlightDataStoreSliceConfig:PersistConfig<IPersistedFlightData> = {
    key: 'flightDataStoreSlice',
    storage
}

const persistedFlightDataStoreSlice = createSlice({
    name: 'persistedFlightDataStoreSlice',
    initialState,
    reducers: {
        addPersistedTelemetry: (state, action: PayloadAction<ITelemetry>) => {
            state.flightData.push(action.payload);
        },
        clearPersistedTelemetry: (): IPersistedFlightData=> {return {flightData: []}}
        // Add more reducers as needed
    },
});

export const { addPersistedTelemetry, clearPersistedTelemetry } = persistedFlightDataStoreSlice.actions;
export default persistedFlightDataStoreSlice.reducer;
