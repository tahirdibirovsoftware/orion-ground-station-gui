import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataFlow, IDataController } from './types';



// Set the initial state with a default data flow value
const initialState: IDataController = {
    dataFlow: 'stopped',
};

// Create the slice with actions to update the data flow
const dataControllerSlice = createSlice({
    name: 'dataControllerSlice',
    initialState,
    reducers: {
        controlTheFlow: (state, action: PayloadAction<DataFlow>) => {
            state.dataFlow = action.payload;
        },
    },
});

// Export the actions
export const { controlTheFlow } = dataControllerSlice.actions;

// Export the reducer
export default dataControllerSlice.reducer;
