/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useCallback } from 'react';
import { createSelector } from 'reselect';
import { Mode } from '../processes';
import { Header } from '../widgets/Header';
import { Menu } from '../widgets/Menu/ui/Menu';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import './styles/App.scss';
import { resetTelemetry } from '@renderer/widgets/DataController/model/flightDataStoreSlice';
import { resetIotTelemetryData } from '@renderer/widgets/DataController/model/iotDataStoreSlice';

// Create a memoized selector
const getAppData = createSelector(
  [
    state => state.menuReducer.isActive,
    state => state.flightDataStoreReducer,
    state => state.iotDataStoreReducer,
    state => state.portConfigReducer.devices.length
  ],
  (menuActive, flightDataStore, iotDataStore, devicesCount) => ({
    menuActive,
    flightDataStore,
    iotDataStore,
    devices: devicesCount
  })
);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Use the memoized selector
  const { menuActive, flightDataStore, iotDataStore, devices } = useAppSelector(getAppData);

  const resetData = useCallback(() => {
    dispatch(resetTelemetry());
    dispatch(resetIotTelemetryData());
  }, [dispatch]);

  useEffect(() => {
    const handlePortListUpdate = ():void => {
      if (!devices) {
        resetData();
      }
    };

    window.api.onPortListUpdated(handlePortListUpdate);

    // Note: We can't remove the listener with the current API structure
    // If you want to add this functionality, you'll need to modify your preload script
  }, [devices, resetData]);

  return (
    <div className='App'>
      {menuActive && <Menu />}
      <Header flightData={flightDataStore} />
      <Mode flightData={flightDataStore} iotData={iotDataStore} />
    </div>
  );
};

export default React.memo(App);