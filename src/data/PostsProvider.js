import React from 'react'
import Firebase from 'firebase'

import { getManyFromQuerySnapshot } from './firestore_utils'
import Error from '../views/Error'

class PostsProvider extends React.Component {

  state = {
    loading: true,
    error: null,
    posts: [],
  }

  componentDidMount() {
    this.updateSubscription()
  }

  componentWillUnmount() {
    this.cancelSubscription()
  }

  updateSubscription = () => {
    const query = Firebase.firestore()
      .collection('posts')
      .onSnapshot(this.setPosts, this.handleError)

    this.setState({
      unsubscribe: query,
    })
  }

  setPosts = snap => {
    this.setState({
      loading: false,
      posts: getManyFromQuerySnapshot(snap),
      error: null,
    })
  }

  handleError = error => {
    this.setState({
      loading: false,
      posts: null,
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

    return this.props.children(this.state.posts)
  }

}

export default PostsProvider
