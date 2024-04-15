import './main.scss'
import ReactDOM from 'react-dom/client'
import {App} from '.'
import { ThemeProvider } from './globals/theme/ThemeProvider'
import { Provider } from 'react-redux'
import { store } from './globals/redux'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <ThemeProvider>
    <Provider store={store}>
    <App/>
    </Provider>
   </ThemeProvider>
)
