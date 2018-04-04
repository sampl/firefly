import React from 'react'
import Firebase from 'firebase'

import { getManyFromQuerySnapshot } from './firestore_utils'

class PostLikesProvider extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      postLikes: [],
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
    this.unsubscribe = Firebase.firestore().collection('postLikes').where('post', '==', this.props.post.id).onSnapshot( snap => {
      this.setState({
        loading: false,
        postLikes: getManyFromQuerySnapshot(snap),
        error: null,
      })
    }, error => {
      this.setState({
        loading: false,
        postLikes: [],
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
      postLikes: this.state.postLikes,
      error: this.state.error,
    })
  }

}

export default PostLikesProvider
