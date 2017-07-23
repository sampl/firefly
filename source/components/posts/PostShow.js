import React from 'react'
import { Link } from 'react-router-dom'

import Error from '../Error'

// model
import Post from '../../models/Post'

class PostShow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      post: {},
      error: null,
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

  render() {
    if (this.state.error) {
      return (<Error message={this.state.error}/>)
    }
    return (
      <div>
        <h1>{this.state.post.title}</h1>
        <p>{this.state.post.content}</p>
        <Link to={'/posts/'+this.state.post.key+'/edit'}>edit post</Link>
      </div>
    )
  }
}

export default PostShow
