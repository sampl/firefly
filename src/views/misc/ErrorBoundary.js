// catch errors in our app and show the error screen instead of just breaking
// https://reactjs.org/docs/error-boundaries.html

import React from 'react'

import Error from './Error'

class ErrorBoundary extends React.Component {
  state = {
    error: null,
  }

  componentDidCatch(error, info) {
    this.setState({ error })

    // send error info to Sentry
    // https://blog.sentry.io/2017/09/28/react-16-error-boundaries
    window.Raven.captureException(error, { extra: info })
  }

  render() {
    if (this.state.error) {
      return <Error error={this.state.error} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
