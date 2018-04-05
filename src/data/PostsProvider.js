import React from 'react'
import Firebase from 'firebase'

import { getManyFromQuerySnapshot } from './firestore_utils'

class PostsProvider extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      posts: [],
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
    this.unsubscribe = Firebase.firestore().collection('posts').onSnapshot( snap => {
      this.setState({
        loading: false,
        posts: getManyFromQuerySnapshot(snap),
        error: null,
      })
    }, error => {
      this.setState({
        loading: false,
        posts: [],
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
      posts: this.state.posts,
      error: this.state.error,
    })
  }

}

export default PostsProvider
