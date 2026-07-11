import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'

const path = window.location.pathname.replace(/\/+$/, '') || '/'

let Page = App

if (path === '/privacy') {
  Page = Privacy
} else if (path === '/terms') {
  Page = Terms
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)