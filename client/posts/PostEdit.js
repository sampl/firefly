import React from 'react'
import { Link } from 'react-router-dom'

import Post from '../../models/Post'
import PostForm from './components/PostForm'
import Error from '../_util/Error'

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
    Post.getBySlug(this.props.match.params.post_slug).then( (post) => {
      this.setState({
        post,
      })
    }).catch( (err) => {
      this.setState({
        error: err.message
      })
    })
  }

  _editPost(post) {
    Post.update(post.key, post).then( (post_key) => {

      // TODO - use promises better here
      Post.get(post_key).then( (post) => {
        this.props.history.push("/posts/"+post.slug)
      }).catch( (err) => {
        alert("Whoops, couldn't find the newly edited post: "+err.message)
      })

    }).catch( (err) => {
      alert("Whoops, couldn't edit the post: "+err.message)
    })
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
