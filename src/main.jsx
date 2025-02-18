import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavMenuContextProvider } from './Context/navMenuContext.jsx';

import { Provider } from 'react-redux'
import { store } from './paint/store'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NavMenuContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </NavMenuContextProvider>
  </Provider>
)
