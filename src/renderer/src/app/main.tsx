import './main.scss'
import ReactDOM from 'react-dom/client'
import {App} from '.'
import { ThemeProvider } from './globals/theme/ThemeProvider'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <ThemeProvider>
    <App/>
   </ThemeProvider>
)
