import React from 'react'
import Firebase from 'firebase'

import { getOneFromQuerySnapshot } from './firestore_utils'

class UserSubscriptionProvider extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      subscription: null,
    }
  }

  componentWillMount() {
    this._subscribeToChanges()
  }

  componentWillReceiveProps() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
    this._subscribeToChanges()
  }

  _subscribeToChanges = () => {
    if (Firebase.auth().currentUser) {
      this.unsubscribe = Firebase.firestore().collection('subscriptions')
      .where('user', '==', Firebase.auth().currentUser.uid)
      .onSnapshot( snap => {
        this.setState({
          loading: false,
          subscription: getOneFromQuerySnapshot(snap),
          error: null,
        })
      }, error => {
        this.setState({
          loading: false,
          subscription: null,
          error,
        })
      })
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  render() {
    return this.props.render({
      loading: this.state.loading,
      subscription: this.state.subscription,
      error: this.state.error,
    })
  }

}

export default UserSubscriptionProvider
