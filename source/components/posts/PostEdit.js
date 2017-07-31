import React from 'react'
import { Link } from 'react-router-dom'

import Post from '../../models/Post'
import PostForm from './PostForm'
import Error from '../Error'

class PostEdit extends React.Component {

  constructor(props) {
    super(props)
    this._editPost = this._editPost.bind(this)
    this._deletePost = this._deletePost.bind(this)
    this.state = {
      post: {}
    }
  }

  componentWillMount() {
    Post.getBySlug(this.props.match.params.post_slug).then(function(post){
      this.setState({
        post,
      })
    }.bind(this)).catch(function(err){
      this.setState({
        error: err.message
      })
    }.bind(this))
  }

  _editPost(post) {
    Post.update(post.key, post).then(function(post_key) {

      // TODO - use promises better here
      Post.get(post_key).then(function(post) {
        this.props.history.push("/posts/"+post.slug)
      }.bind(this)).catch(function(err){
        alert("Whoops, couldn't find the newly edited post: "+err.message)
      })

    }.bind(this)).catch(function(err){
      alert("Whoops, couldn't edit the post: "+err.message)
    }.bind(this))
  }

  _deletePost() {
    Post.destroy(this.state.post.key)
  }

  render() {
    if (this.state.error) {
      return (<Error message={this.state.error}/>)
    }

    let form
    if (this.state.post.title) {
      form = <PostForm post={this.state.post} onSubmit={this._editPost} />
    } else {
      form = 'loading...'
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
