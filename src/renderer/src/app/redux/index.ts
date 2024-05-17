// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { menuReducer } from '@renderer/features/MenuToggler';
import { portConfigReducer } from '@renderer/features/PortConfig';
import {baudRateReducer } from '@renderer/features/BaudRateConfig';
import { connectorReducer } from '@renderer/features/Connector';
import { dataControllerReducer, flightDataStoreReducer, iotDataStoreReducer } from '@renderer/widgets/DataController';

const store = configureStore({
  reducer: {
    menuReducer: menuReducer.default,
    portConfigReducer: portConfigReducer.default,
    baudRateReducer: baudRateReducer.default,
    connectorReducer: connectorReducer.default,
    dataControllerReducer: dataControllerReducer.default,
    flightDataStoreReducer: flightDataStoreReducer.default,
    iotDataStoreReducer: iotDataStoreReducer.default
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
