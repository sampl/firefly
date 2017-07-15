import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

// model
import PostModel from '../../models/Posts'

class Posts extends React.Component {

  constructor(props) {
    super(props)
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
          <Link to={'/posts/'+post.key}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.content}</p>
        </div>
      )
    })
    return (
      <div>
        <h1>All Posts</h1>
        <Link to={'/posts/new'}>new post</Link>
        {posts}
      </div>
    )
  }
}

export default Posts
