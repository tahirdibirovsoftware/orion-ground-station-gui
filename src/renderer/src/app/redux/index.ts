import { configureStore } from '@reduxjs/toolkit'
import { menuReducer } from '../../features/MenuToggler'
import { portConfigReducer } from '@renderer/features/PortConfig'
// ...
const store = configureStore({
  reducer: {
    menuReducer: menuReducer.default,
    portConfigReducer: portConfigReducer.default
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store