import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContactPage from './components/ContactPage.jsx'
import LanguageProvider from './components/LanguageProvider.jsx'
import PrivacyPage from './components/PrivacyPage.jsx'
import ProductPage from './components/ProductPage.jsx'
import { PRODUCTS } from './data/products'
import { currentPath } from './routes'

// The pages, picked by path; any other path shows the home page.
function pickPage() {
  const path = currentPath()
  if (path === '/contact') return <ContactPage />
  if (path === '/privacy-policy') return <PrivacyPage />
  const product = PRODUCTS.find(({ slug }) => path === `/products/${slug}`)
  if (product) return <ProductPage product={product} />
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>{pickPage()}</LanguageProvider>
  </StrictMode>,
)
