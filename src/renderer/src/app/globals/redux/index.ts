import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '@renderer/widgets/Menu/model/menuSlice'

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
