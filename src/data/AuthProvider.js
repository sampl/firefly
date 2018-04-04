import React from 'react'
import Firebase from 'firebase'

class AuthProvider extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      auth: null,
    }
  }

  componentWillMount() {
    this._subscribeToAuthChanges()
  }

  componentWillReceiveProps() {
    this._subscribeToAuthChanges()
  }

  _subscribeToAuthChanges = () => {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
    this.unsubscribe = Firebase.auth().onAuthStateChanged( auth => {
      this.setState({
        loading: false,
        auth,
        error: null,
      })
    }, error => {
      this.setState({
        loading: false,
        auth: null,
        error,
      })
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  render() {
    return this.props.render({
      loading: this.state.loading,
      auth: this.state.auth,
      error: this.state.error,
    })
  }

}

export default AuthProvider
