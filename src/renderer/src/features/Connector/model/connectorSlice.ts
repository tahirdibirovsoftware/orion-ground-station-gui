import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ConnectionStatus } from './types';

// Define the shape of the connector state
export interface IConnectorState {
    flightConnect: ConnectionStatus;
    iotConnect: ConnectionStatus;
}

// Set the initial state with default connection statuses
const initialState: IConnectorState = {
    flightConnect: 'disconnected',
    iotConnect: 'disconnected',
};

// Create the slice with actions to update the connection statuses
const connectorSlice = createSlice({
    name: 'connectorSlice',
    initialState,
    reducers: {
        connectToFlight: (state, action: PayloadAction<ConnectionStatus>) => {
            state.flightConnect = action.payload;
        },
        connectToIoT: (state, action: PayloadAction<ConnectionStatus>) => {
            state.iotConnect = action.payload;
        },
    },
});

// Export the actions
export const { connectToFlight, connectToIoT } = connectorSlice.actions;

// Export the reducer
export default connectorSlice.reducer;
