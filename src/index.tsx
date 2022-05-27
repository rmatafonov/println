import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './styles/index.css'

const rootElement = document.getElementById('root') as HTMLDivElement
const root = createRoot(rootElement)
root.render(<App />)
