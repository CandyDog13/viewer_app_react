import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'mobx-react';
import Store from './store/store.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider {...Store}>
      <App />
    </Provider>
  </StrictMode>,
)
