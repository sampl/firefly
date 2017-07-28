import React from 'react'
import { Link } from 'react-router-dom'

import Post from '../../models/Post'
import PostLiker from './PostLiker'
import Error from '../Error'

class PostShow extends React.Component {

  constructor(props) {
    super(props)
    this._get = this._get.bind(this)
    this.state = {
      post: {},
      error: null,
    }
  }

  componentWillMount() {
    this._get()
    Post.on('change', this._get)
  }

  componentWillUnmount() {
    Post.removeListener('change', this._get)
  }

  _get() {
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

  render() {
    if (this.state.error) {
      return (<Error message={this.state.error}/>)
    }
    if (!this.state.post.title) {
      return (<div>loading...</div>)
    } else {
      return (
        <div>
          <h1>{this.state.post.title}</h1>
          <PostLiker post={this.state.post} />
          <p>{this.state.post.content}</p>
          <Link to={'/posts/'+this.state.post.key+'/edit'}>edit post</Link>
        </div>
      )
    }
  }
}

export default PostShow
