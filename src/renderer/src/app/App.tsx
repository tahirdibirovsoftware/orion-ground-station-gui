import { Mode } from '../processes';
import { Header } from '../widgets/Header';
import { Menu } from '../widgets/Menu/ui/Menu';
import { useAppSelector } from './redux/hooks';
import './styles/App.scss';

const App = (): JSX.Element => {

  const menuActive = useAppSelector(state => state.menuReducer.isActive)
  const port = useAppSelector(state => state.portConfigReducer)
  const baudRate = useAppSelector(state => state.baudRateReducer)
  const flightDataStore = useAppSelector(state=> state.flightDataStoreReducer)
  const iotDataStore = useAppSelector(state=>state.iotDataStoreReducer)
  console.log(window.api)
  console.log('flightDatastore:', flightDataStore)
  console.log('iotDatastore:', iotDataStore)
  console.log(port)
  console.log(baudRate)
  return (
    <div className='App'>
      {menuActive && <Menu />}
      <Header />
      <Mode />
    </div>
  )
}

export default App;