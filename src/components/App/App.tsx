import React, { Component } from 'react'

import ErrorBoundary from '../ErrorBoundary'
import { GameContainer } from '../canvas'


import './App.css'

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div className="app-container">
          <GameContainer />
        </div>
      </ErrorBoundary>
    )
  }
}

export default App
