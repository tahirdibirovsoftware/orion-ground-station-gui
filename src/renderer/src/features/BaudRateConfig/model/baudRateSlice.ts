import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaudRateState } from './types';


const initialState: BaudRateState = {
    flightBaudRate: 57600, // Replace with your default value
    iotBaudRate: 57600 // Replace with your default value
};

const baudRateSlice = createSlice({
    name: 'baudRateSlice',
    initialState,
    reducers: {
        setFlightBaudRate: (state, action: PayloadAction<number>) => {
            state.flightBaudRate = action.payload;
        },
        setIoTBaudRate: (state, action: PayloadAction<number>) => {
            state.iotBaudRate = action.payload;
        }
    }
});

export const { setFlightBaudRate, setIoTBaudRate } = baudRateSlice.actions;

export default baudRateSlice.reducer;
