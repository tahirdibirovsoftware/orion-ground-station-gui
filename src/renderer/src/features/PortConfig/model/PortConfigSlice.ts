// src/renderer/features/PortConfig/model/PortConfigSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SerialPort } from 'serialport';

type SerialPortListType = Awaited<ReturnType<typeof SerialPort.list>>;

export interface PortConfigState {  // Export the type
  flightPath: string;
  iotPath: string;
  devices: SerialPortListType;
}

const initialState: PortConfigState = {
  flightPath: '',
  iotPath: '',
  devices: []
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
    
    setDevices: (state, action: PayloadAction<SerialPortListType>)=>{
      state.devices = action.payload
    }

  }
});

export const { setIoTConfig, setFlightConfig, setDevices } = portConfigSlice.actions;
export default portConfigSlice.reducer;
