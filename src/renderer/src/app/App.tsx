import { Mode } from '../processes';
import { Header } from '../widgets/Header';
import { Menu } from '../widgets/Menu/ui/Menu';
import { useAppSelector } from './redux/hooks';
import './styles/App.scss';

const App = (): JSX.Element => {

  const menuActive = useAppSelector(state => state.menuReducer.isActive)
  const flightDataStore = useAppSelector(state=> state.flightDataStoreReducer)
  const iotDataStore = useAppSelector(state=>state.iotDataStoreReducer)


  return (
    <div className='App'>
      {menuActive && <Menu />}
      <Header flightData={flightDataStore}/>
      <Mode flightData={flightDataStore} iotData={iotDataStore}/>
    </div>
  )
}

export default App;