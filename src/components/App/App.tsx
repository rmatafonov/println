import React, { Component } from 'react'
import ErrorBoundary from '../ErrorBoundary'
import Bug from '@/components/Bug'

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Bug />
      </ErrorBoundary>
    )
  }
}

export default App
