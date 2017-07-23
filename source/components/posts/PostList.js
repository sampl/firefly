import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import Error from '../Error'

// model
import Post from '../../models/Post'

class PostList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    Post.getAll(function(err, posts){
      if (err) {
        this.setState({
          error: err.message
        })
      } else {
        this.setState({
          posts,
        })
      }
    }.bind(this))
  }

  render() {

    if (this.state.error) {
      return (<Error message={this.state.error}/>)
    }

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

export default PostList
