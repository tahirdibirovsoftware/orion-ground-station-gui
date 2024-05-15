// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { menuReducer } from '../../features/MenuToggler';
import { portConfigReducer } from '@renderer/features/PortConfig';
import {baudRateReducer } from '@renderer/features/BaudRateConfig';

const store = configureStore({
  reducer: {
    menuReducer: menuReducer.default,
    portConfigReducer: portConfigReducer.default,
    baudRateReducer: baudRateReducer.default
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
