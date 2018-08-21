// wrapper for Firebase Authentication
// similar API to react-firestore, but instead of returning a collection or document
// it returns the logged in user or null if not logged in (along with loading state and errors)

import Firebase from 'firebase/app'
import React from 'react'

class FirebaseAuth extends React.Component {

  state = {
    isLoading: true,
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
      isLoading: false,
      auth,
      error: null,
    })
  }

  handleError = error => {
    this.setState({
      isLoading: false,
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
    return this.props.children(this.state)
  }

}

export default FirebaseAuth
