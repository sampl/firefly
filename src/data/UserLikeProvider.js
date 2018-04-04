import React from 'react'
import Firebase from 'firebase'

import { getOneFromQuerySnapshot } from './firestore_utils'

class UserLikeProvider extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      userLike: null,
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
    this.unsubscribe = Firebase.firestore().collection('postLikes')
      .where('post', '==', this.props.post.id)
      .where('user', '==', Firebase.auth().currentUser.uid)
      .onSnapshot( snap => {
        this.setState({
          loading: false,
          userLike: getOneFromQuerySnapshot(snap),
          error: null,
        })
      }, error => {
        this.setState({
          loading: false,
          userLike: null,
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
      userLike: this.state.userLike,
      error: this.state.error,
    })
  }

}

export default UserLikeProvider
