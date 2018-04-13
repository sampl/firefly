import React from 'react'
import Firebase from 'firebase'

import { getOneFromQuerySnapshot } from './firestore_utils'
import Error from '../views/Error'

class UserSubscriptionProvider extends React.Component {

  state = {
    loading: true,
    error: null,
    subscription: null,
  }

  componentDidMount() {
    this.updateSubscription()
  }

  componentDidUpdate(props) {
    if (this.props.auth.uid !== props.auth.uid) {
      this.updateSubscription()
    }
  }

  componentWillUnmount() {
    this.cancelSubscription()
  }

  updateSubscription = () => {
    this.cancelSubscription()

    const query = Firebase.firestore()
      .collection('subscriptions')
      .where('user', '==', this.props.auth.uid)
      .onSnapshot(this.setSubscription, this.handleError)

    this.setState({
      unsubscribe: query,
    })
  }

  setSubscription = snap => {
    this.setState({
      loading: false,
      subscription: getOneFromQuerySnapshot(snap),
      error: null,
    })
  }

  handleError = error => {
    this.setState({
      loading: false,
      subscription: null,
      error,
    })
  }

  cancelSubscription = () => {
    if (this.state.unsubscribe) {
      this.state.unsubscribe()
    }
  }

  render() {
    if (this.state.error) {
      return this.props.error || <Error error={this.state.error} />
    }

    if (this.state.loading) {
      return this.props.loading || 'loading...'
    }

    return this.props.children(this.state.subscription)
  }

}

export default UserSubscriptionProvider
