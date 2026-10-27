import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BlogPage, { PostPage } from './components/BlogPage.jsx'
import CasesPage, { CasePage } from './components/CasesPage.jsx'
import ContactPage from './components/ContactPage.jsx'
import DocsPage from './components/DocsPage.jsx'
import GalleryPage from './components/GalleryPage.jsx'
import JobsPage from './components/JobsPage.jsx'
import LanguageProvider from './components/LanguageProvider.jsx'
import PrivacyPage from './components/PrivacyPage.jsx'
import ProductPage from './components/ProductPage.jsx'
import { POSTS } from './data/blog'
import { CASES } from './data/cases'
import { PRODUCTS } from './data/products'
import { currentPath } from './routes'

const PAGES = {
  '/contact': ContactPage,
  '/privacy-policy': PrivacyPage,
  '/docs': DocsPage,
  '/jobs': JobsPage,
  '/cases': CasesPage,
  '/gallery': GalleryPage,
  '/blog': BlogPage,
}

// The pages, picked by path; any other path shows the home page.
function pickPage() {
  const path = currentPath()
  const Page = PAGES[path]
  if (Page) return <Page />

  const [, section, slug] = path.split('/')
  if (section === 'products') {
    const product = PRODUCTS.find((p) => p.slug === slug)
    if (product) return <ProductPage product={product} />
  }
  if (section === 'cases') {
    const story = CASES.find((c) => c.slug === slug)
    if (story) return <CasePage story={story} />
  }
  if (section === 'blog') {
    const post = POSTS.find((p) => p.slug === slug)
    if (post) return <PostPage post={post} />
  }
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>{pickPage()}</LanguageProvider>
  </StrictMode>,
)
