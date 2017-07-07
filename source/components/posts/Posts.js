import React from 'react'
import _ from 'lodash'

// components
import Post from './Post'

class Posts extends React.Component {

  constructor() {
    super()
    this.state = {
      posts: [
        {
          key: 1,
          title: 'Hello World',
          content: 'nice weather, eh?',
        },
        {
          key: 2,
          title: 'Lorem Ipsum',
          content: 'dolor sin amet',
        },
      ]
    }
  }

  render() {
    var posts = _.map(this.state.posts, function(post) {
      return( <Post key={post.key} post={post} /> )
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
