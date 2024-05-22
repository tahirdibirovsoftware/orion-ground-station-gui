import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IControllingData } from "./types";


export const initiaControllingState: IControllingData = {
    parachuteState: 0,
    iot: 0.0,
    mfm: '0N0N'
}

const controllingDataSlice = createSlice({
    name: 'controllingDataSlice',
    initialState: initiaControllingState,
    reducers: {
        commandTheParachute: (state: IControllingData, action: PayloadAction<Pick<IControllingData, 'parachuteState'>>):void=>{
            state.parachuteState=action.payload.parachuteState
        },
        setIot: (state: IControllingData, action: PayloadAction<Pick<IControllingData, 'iot'>>):void=>{
            state.iot=action.payload.iot
        },
        setMfm: (state: IControllingData, action: PayloadAction<Pick<IControllingData, 'mfm'>>):void=>{
            state.mfm=action.payload.mfm
        }
    }
})

export const { commandTheParachute, setIot, setMfm } = controllingDataSlice.actions;
export default controllingDataSlice.reducer;