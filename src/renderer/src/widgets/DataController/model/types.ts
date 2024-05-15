// Define the possible values for DataFlow
export type DataFlow = 'stopped' | 'started';

// Define the shape of the data controller state
export interface IDataController {
    dataFlow: DataFlow;
}