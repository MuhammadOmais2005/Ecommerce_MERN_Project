import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store'
import theme from './utils/Theme'
import AppThemeProvider from './utils/Theme'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </Provider>
  // </StrictMode>,
)
