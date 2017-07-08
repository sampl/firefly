import React from 'react'
import { Link } from 'react-router-dom'

// model
import PostModel from '../../models/Posts'

class Posts extends React.Component {

  constructor() {
    super()
    this.state = {
      post: []
    }
  }

  componentWillMount() {
    PostModel.get(this.props.match.params.post_key, function(err, post){
      this.setState({
        post: post,
      })
    }.bind(this))
  }

  render() {
    return (
      <div>
        <h1>{this.state.post.title}</h1>
        <p>{this.state.post.content}</p>
        <Link to={'/posts/'}>back to all posts</Link>
      </div>
    )
  }
}

export default Posts
