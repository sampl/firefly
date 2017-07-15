import React from 'react'
import {
  Link,
  Redirect
} from 'react-router-dom'

import PostForm from './PostForm'

// model
import PostModel from '../../models/Posts'

class PostCreate extends React.Component {

  constructor(props) {
    super(props)
    this._savePost = this._savePost.bind(this)
    this.state = {}
  }

  _savePost(post) {
    PostModel.create(post, function(err, post_key) {
      this.setState({
        justSavedPost: post_key
      })
    }.bind(this))
  }

  render() {

    // shouldn't pass null to controlled components in PostForm
    var emptyPost = {
      title: '',
      content: '',
    }

    // "render" a redirect when a post is saved
    var redirect = this.state.justSavedPost ? <Redirect to={'/posts/'+this.state.justSavedPost} /> : null

    return (
      <div>
        { redirect }
        <h1>New post</h1>
        <PostForm post={emptyPost} onSubmit={this._savePost}/>
      </div>
    )
  }
}

export default PostCreate
