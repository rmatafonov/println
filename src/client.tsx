import * as React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { fetchUser } from './redux/userSlice'
import store from './redux/store'
import ErrorBoundary from './components/ErrorBoundary'
import App from './components/App'
import 'babel-polyfill'
import './styles/index.css'

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

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then((registration) => {
//         console.log('SW registered: ', registration)
//       })
//       .catch((registrationError) => {
//         console.log('SW registration failed: ', registrationError)
//       })
//   })
// }
