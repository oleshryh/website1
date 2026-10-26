import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContactPage from './components/ContactPage.jsx'
import LanguageProvider from './components/LanguageProvider.jsx'
import { CONTACT_PATH } from './routes'

// Two pages, picked by path; every other path shows the home page.
const Page = window.location.pathname.replace(/\/$/, '') === CONTACT_PATH ? ContactPage : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  </StrictMode>,
)
