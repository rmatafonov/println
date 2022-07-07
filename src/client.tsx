import * as React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { fetchUser } from './redux/userSlice'
import configureAppStore from './redux/store'
import ErrorBoundary from './components/ErrorBoundary'
import App from './components/App'
import 'babel-polyfill'
import './styles/index.css'

// @ts-ignore
const store = configureAppStore(window.__PRELOADED_STATE__)
store.dispatch(fetchUser())

const app = (
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
)
const rootElement = document.getElementById('root') as HTMLDivElement
hydrateRoot(
  rootElement,
  app
)
