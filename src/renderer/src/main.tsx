import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'
import { Provider } from 'react-redux'
import store, { persistor } from './app/redux'
import { ThemeProvider } from './app/providers/ThemeProvider/ThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>
  <ThemeProvider>
    <Provider store={store}>
     <PersistGate persistor={persistor}>
     <BrowserRouter>
     <App />
     </BrowserRouter>
     </PersistGate>
    </Provider>
  </ThemeProvider>
  </I18nextProvider>
    
    
)
