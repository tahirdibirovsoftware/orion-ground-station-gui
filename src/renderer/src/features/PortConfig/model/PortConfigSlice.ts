// src/renderer/features/PortConfig/model/PortConfigSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PortConfigState {  // Export the type
  flightPath: string;
  iotPath: string;
}

const initialState: PortConfigState = {
  flightPath: '',
  iotPath: '',
};

interface SetConfigPayload {
  path: string;
}

const portConfigSlice = createSlice({
  name: 'portConfig',
  initialState,
  reducers: {
    setIoTConfig: (state, action: PayloadAction<SetConfigPayload>) => {
      state.iotPath = action.payload.path;
    },
    setFlightConfig: (state, action: PayloadAction<SetConfigPayload>) => {
      state.flightPath = action.payload.path;
    },
  },
});

export const { setIoTConfig, setFlightConfig } = portConfigSlice.actions;
export default portConfigSlice.reducer;
