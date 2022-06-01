import React, { Component, ErrorInfo, ReactNode } from 'react'

type OwnProps = {
  children: ReactNode
}

type Props = OwnProps

type State = {
  error: Error | null
  errorInfo: ErrorInfo | null
}

export default class ErrorBoundary extends Component<Props> {
  state: State

  constructor(props: Props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { children } = this.props
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Произошла ошибка:</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      )
    }
    // Normally, just render children
    return children
  }
}
