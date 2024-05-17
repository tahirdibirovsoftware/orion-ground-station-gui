import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIoTTelemetry } from 'src/global/types/types';

// Set the initial state as an empty array of IIoTTelemetry
const initialState: Array<IIoTTelemetry> = [];

// Create the slice with actions to manage the IoT data
const iotDataStoreSlice = createSlice({
    name: 'iotDataSlice',
    initialState,
    reducers: {
        addIotData: (state, action: PayloadAction<IIoTTelemetry>) => {
            state.push(action.payload);
        },
        clearTelemetryData: () => {
            return initialState;
        }
    }
});

// Export the actions
export const { addIotData, clearTelemetryData } = iotDataStoreSlice.actions;

// Export the reducer
export default iotDataStoreSlice.reducer;
