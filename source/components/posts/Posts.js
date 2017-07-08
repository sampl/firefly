import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

// model
import PostModel from '../../models/Posts'

class Posts extends React.Component {

  constructor() {
    super()
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    PostModel.getAll(function(err, posts){
      this.setState({
        posts: posts,
      })
    }.bind(this))
  }

  render() {
    var posts = _.map(this.state.posts, function(post) {
      return(
        <div key={post.key}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <Link to={'/posts/'+post.key}>show post</Link>
        </div>
      )
    })
    return (
      <div>
        <h1>All Posts</h1>
        {posts}
      </div>
    )
  }
}

export default Posts
