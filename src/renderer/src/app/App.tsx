import { Mode } from '../processes';
import { Header } from '../widgets/Header';
import { Menu } from '../widgets/Menu/ui/Menu';
import { useAppSelector } from './redux/hooks';
import './styles/App.scss';

const App = ():JSX.Element => {

  const menuActive = useAppSelector(state=>state.menuReducer.isActive)


  return(
    <div className='App'>
      {menuActive && <Menu/>}
      <Header/>
      <Mode/>
    </div>
  )
}

export default App;