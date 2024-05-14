
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/redux/index.ts'
import { ThemeProvider } from './app/providers/ThemeProvider/ThemeProvider.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <Provider store={store}>
     <BrowserRouter>
     <App />
     </BrowserRouter>
    </Provider>
  </ThemeProvider>
    
    
)
