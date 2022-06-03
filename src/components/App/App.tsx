import React, { Component } from 'react'

import ErrorBoundary from '../ErrorBoundary'
import Leaderboard from '../Leaderboard'

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Leaderboard />
      </ErrorBoundary>
    )
  }
}

export default App
