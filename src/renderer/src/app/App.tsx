import { useEffect } from 'react';
import { Mode } from '../processes';
import { Header } from '../widgets/Header';
import { Menu } from '../widgets/Menu/ui/Menu';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import './styles/App.scss';
import { resetTelemetry } from '@renderer/widgets/DataController/model/flightDataStoreSlice';
import { resetIotTelemetryData } from '@renderer/widgets/DataController/model/iotDataStoreSlice';

const App = (): JSX.Element => {

  const menuActive = useAppSelector(state => state.menuReducer.isActive)
  const flightDataStore = useAppSelector(state=> state.flightDataStoreReducer)
  const iotDataStore = useAppSelector(state=>state.iotDataStoreReducer)
  const devices = useAppSelector(state=>state.portConfigReducer.devices).length
  const dispatch = useAppDispatch()


  useEffect(()=>{
    window.api.onPortListUpdated(()=>{
      
      if(!devices){
        dispatch(resetTelemetry())
        dispatch(resetIotTelemetryData())
      }
      
    })
  },[])

  return (
    <div className='App'>
      {menuActive && <Menu />}
      <Header flightData={flightDataStore}/>
      <Mode flightData={flightDataStore} iotData={iotDataStore}/>
    </div>
  )
}

export default App;