import React from 'react'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

import User from '../../models/User'
import PostLike from '../../models/PostLike'

class PostLiker extends React.Component {

  constructor(props) {
    super(props)
    this._get = this._get.bind(this)
    this._onClick = this._onClick.bind(this)
    this.state = {
      numLikes: 0,
      userLike: null,
    }
  }

  componentWillMount() {
    this._isMounted = true
    this._get()
    PostLike.on('change', this._get)
  }

  componentWillUnmount() {
    this._isMounted = false
    PostLike.removeListener('change', this._get)
  }

  _get() {

    PostLike.getAllWithAttrValue('post', this.props.post.key).then( (likes) => {

      let userLike = null

      // see if any of the likes on the post are the current user
      if (User.getLoggedInUser()) {
        userLike = _.find(likes, (like) =>
          like.created_by === User.getLoggedInUser().uid
        )
      }

      if (this._isMounted) {
        this.setState({
          userLike,
          numLikes: likes ? likes.length : 0,
        })
      }
    }).catch( (err) => {
      // ignore error?
    })

  }

  _onClick() {

    if (User.getLoggedInUser()) {
      if (!this.state.userLike) {
        PostLike.create({post: this.props.post.key}, () => {})
      } else {
        PostLike.destroy(this.state.userLike.key, () => {})
      }
    } else {
      let state = {
        modal: true,
        returnTo: this.props.location.pathname,
      }
      this.props.history.push('/login?redirect_url='+window.location.pathname, state)
    }

  }

  render() {
    return(
      <div style={this.state.userLike ? style.liked : style.unliked} onClick={this._onClick}>
        like this post ({this.state.numLikes} likes)
      </div>
    )
  }
}

export default withRouter(PostLiker)

let style = {
  liked: {
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  unliked: {
    cursor: 'pointer',
  },
}
