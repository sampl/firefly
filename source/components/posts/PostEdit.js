import React from 'react'
import { Link } from 'react-router-dom'

import PostForm from './PostForm'
import Error from '../Error'

// model
import Post from '../../models/Post'

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
    Post.get(this.props.match.params.post_key, function(err, post){
      if (err) {
        this.setState({
          error: err.message
        })
      } else {
        this.setState({
          post,
        })
      }
    }.bind(this))
  }

  _savePost(post) {
    Post.update(post.key, post, function(err, post) {
      if (err) {
        alert(err.message)
      }
      this.props.history.goBack()
    }.bind(this))
  }

  _deletePost() {
    Post.destroy(this.state.post.key)
  }

  render() {
    if (this.state.error) {
      return (<Error message={this.state.error}/>)
    }

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
