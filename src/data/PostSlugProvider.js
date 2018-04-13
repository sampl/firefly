import React from 'react'
import Firebase from 'firebase'

import { getOneFromQuerySnapshot } from './firestore_utils'
import Error from '../views/Error'

class PostSlugProvider extends React.Component {

  state = {
    loading: true,
    error: null,
    post: null,
    unsubscribe: null,
  }

  componentDidMount() {
    this.updateSubscription()
  }

  componentDidUpdate(props) {
    if (this.props.slug !== props.slug) {
      this.updateSubscription()
    }
  }

  componentWillUnmount() {
    this.cancelSubscription()
  }

  updateSubscription = () => {
    this.cancelSubscription()

    const query = Firebase.firestore()
      .collection('posts')
      .where('slug', '==', this.props.slug)
      .onSnapshot(this.setPost, this.handleError)

    this.setState({
      unsubscribe: query,
    })
  }

  setPost = snap => {
    this.setState({
      loading: false,
      post: getOneFromQuerySnapshot(snap),
      error: null,
    })
  }

  handleError = error => {
    this.setState({
      loading: false,
      post: null,
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

    return this.props.children(this.state.post)
  }

}

export default PostSlugProvider
