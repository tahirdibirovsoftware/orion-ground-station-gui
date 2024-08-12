import React, { useEffect, useCallback } from 'react';
import { Mode } from '../processes';
import { Header } from '../widgets/Header';
import { Menu } from '../widgets/Menu/ui/Menu';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import './styles/App.scss';
import { resetTelemetry } from '@renderer/widgets/DataController/model/flightDataStoreSlice';
import { resetIotTelemetryData } from '@renderer/widgets/DataController/model/iotDataStoreSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const menuActive = useAppSelector(state => state.menuReducer.isActive);
  const flightDataStore = useAppSelector(state => state.flightDataStoreReducer);
  const iotDataStore = useAppSelector(state => state.iotDataStoreReducer);
  const devices = useAppSelector(state => state.portConfigReducer.devices.length);

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