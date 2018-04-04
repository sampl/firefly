import React from 'react'
import Firebase from 'firebase'

import { getOneFromQuerySnapshot } from './firestore_utils'

class PostSlugProvider extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      post: null,
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
    this.unsubscribe = Firebase.firestore().collection('posts').where('slug', '==', this.props.slug).onSnapshot( snap => {
      this.setState({
        loading: false,
        post: getOneFromQuerySnapshot(snap),
        error: null,
      })
    }, error => {
      this.setState({
        loading: false,
        post: null,
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
      post: this.state.post,
      error: this.state.error,
    })
  }

}

export default PostSlugProvider
