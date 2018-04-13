import React from 'react'
import Firebase from 'firebase'

import { getManyFromQuerySnapshot } from './firestore_utils'
import Error from '../views/Error'

class PostLikesProvider extends React.Component {

  state = {
    loading: true,
    error: null,
    postLikes: [],
  }

  componentDidMount() {
    this.updateSubscription()
  }

  componentDidUpdate(props) {
    if (this.props.post.id !== props.post.id) {
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
      .onSnapshot(this.setPosts, this.handleError)

    this.setState({
      unsubscribe: query,
    })
  }

  setPosts = snap => {
    this.setState({
      loading: false,
      postLikes: getManyFromQuerySnapshot(snap),
      error: null,
    })
  }

  handleError = error => {
    this.setState({
      loading: false,
      postLikes: [],
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

    return this.props.children(this.state.postLikes)
  }

}

export default PostLikesProvider
