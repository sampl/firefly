import React from 'react'
import Firebase from 'firebase'

import Error from '../views/Error'

class AuthProvider extends React.Component {

  state = {
    loading: true,
    error: null,
    auth: null,
  }

  componentDidMount() {
    this.updateSubscription()
  }

  componentWillUnmount() {
    this.cancelSubscription()
  }

  updateSubscription = () => {
    this.unsubscribe = Firebase.auth()
      .onAuthStateChanged(this.setAuth, this.handleError)
  }

  setAuth = auth => {
    this.setState({
      loading: false,
      auth,
      error: null,
    })
  }

  handleError = error => {
    this.setState({
      loading: false,
      auth: null,
      error,
    })
  }

  cancelSubscription = () => {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  render() {
    if (this.state.error) {
      return this.props.error || <Error error={this.state.error} />
    }

    if (this.state.loading) {
      return this.props.loading || 'loading...'
    }

    return this.props.children(this.state.auth)
  }

}

export default AuthProvider
