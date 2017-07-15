import React from 'react'
import { Link } from 'react-router-dom'

import PostForm from './PostForm'

// model
import PostModel from '../../models/Posts'

class PostEdit extends React.Component {

  constructor(props) {
    super(props)
    this._savePost = this._savePost.bind(this)
    this._deletePost = this._deletePost.bind(this)
    this.state = {
      post: {}
    }
  }

  componentWillMount() {
    PostModel.get(this.props.match.params.post_key, function(err, post){
      this.setState({
        post,
      })
    }.bind(this))
  }

  _savePost(post) {
    PostModel.update(post.key, post, function(err, post) {
      console.log(err, post)
      this.props.history.goBack()
    }.bind(this))
  }

  _deletePost() {
    PostModel.destroy(this.state.post.key)
  }

  render() {
    if (this.state.post.title) {
      var form = <PostForm post={this.state.post} onSubmit={this._savePost} />
    } else {
      var form = 'loading...'
    }
    return (
      <div>
        <h1>Edit post</h1>
        {form}
        <a href="" onClick={this._deletePost}>delete post</a>
      </div>
    )
  }
}

export default PostEdit
