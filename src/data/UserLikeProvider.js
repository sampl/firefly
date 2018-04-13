import React from 'react'
import Firebase from 'firebase'

import { getOneFromQuerySnapshot } from './firestore_utils'
import Error from '../views/Error'

class UserLikeProvider extends React.Component {

  state = {
    loading: true,
    error: null,
    userLike: null,
  }

  componentDidMount() {
    this.updateSubscription()
  }

  componentDidUpdate(props) {
    if (this.props.post.id !== props.post.id || this.props.auth.uid !== props.auth.uid) {
      this.updateSubscription()
    }
  }

  componentWillUnmount() {
    this.cancelSubscription()
  }

  updateSubscription = () => {
    this.cancelSubscription()

    const query = Firebase.firestore()
      .collection('postLikes')
      .where('post', '==', this.props.post.id)
      .where('user', '==', this.props.auth.uid)
      .onSnapshot(this.setUserLike, this.handleError)

    this.setState({
      unsubscribe: query,
    })
  }

  setUserLike = snap => {
    this.setState({
      loading: false,
      userLike: getOneFromQuerySnapshot(snap),
      error: null,
    })
  }

  handleError = error => {
    this.setState({
      loading: false,
      userLike: null,
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

    return this.props.children(this.state.userLike)
  }

}

export default UserLikeProvider
