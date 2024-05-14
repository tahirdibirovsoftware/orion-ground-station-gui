import { configureStore } from '@reduxjs/toolkit'
import { menuReducer } from '../../features/MenuToggler'
// ...
const store = configureStore({
  reducer: {
    menuReducer: menuReducer.default
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store