import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { fetchUser } from './redux/userSlice'
import store from './store'
import ErrorBoundary from './components/ErrorBoundary'
import App from './components/App'
import './styles/index.css'

store.dispatch(fetchUser())

const app = (
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
)
const rootElement = document.getElementById('root') as HTMLDivElement
const root = createRoot(rootElement)
root.render(app)
