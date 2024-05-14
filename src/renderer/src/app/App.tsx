// import { useEffect } from 'react';
import { Mode } from '../processes';
import { Header } from '../widgets/Header';
import { Menu } from '../widgets/Menu/ui/Menu';
import { useAppSelector } from './redux/hooks';
import './styles/App.scss';

const App = ():JSX.Element => {

  const menuActive = useAppSelector(state=>state.menuReducer.isActive)

  // useEffect(()=>{
  //   window.ipcRenderer.send('hi')
  //   window.ipcRenderer.on('hi', (event, data)=>{
  //     console.log(data)
  //     console.log('hey')
  //   })
  // },[])

  return(
    <div className='App'>
      {menuActive && <Menu/>}
      <Header/>
      <Mode/>
    </div>
  )
}

export default App;