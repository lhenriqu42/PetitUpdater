import { createRoot } from 'react-dom/client'
import ConfigPage from './Config.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StrictMode } from 'react'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {
      window.location.hash === '#config' ?
        <ConfigPage /> :
        <App />
    }
  </StrictMode >
)
