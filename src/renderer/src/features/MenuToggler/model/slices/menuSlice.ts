import { createSlice } from "@reduxjs/toolkit";

const initialState = {isActive: false}

const menuSlice = createSlice({
    name: 'menuReducer',
    initialState,
    reducers: {
        toggleMenu: (state: typeof initialState)=>{
            return {isActive: !state.isActive}
        }
    } 
})

export const {toggleMenu} = menuSlice.actions;
export default menuSlice.reducer