import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import Post from '../../models/Post'
import Error from '../Error'

class PostList extends React.Component {

  constructor(props) {
    super(props)
    this._get = this._get.bind(this)
    this.state = {
      posts: []
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
    Post.getAll().then( (posts) => {
      this.setState({
        posts,
      })
    }).catch( (err) => {
      this.setState({
        error: err.message
      })
    })
  }

  render() {

    if (this.state.error) {
      return (<Error message={this.state.error}/>)
    }

    let posts = this.state.posts.sort((a, b) => (a._like_count || 0) < (b._like_count || 0))

    posts = _.map(posts, (post) =>
      <div key={post.key}>
        <Link to={'/posts/'+post.slug}>
          <h2>{post.title}</h2>
        </Link>
        <p>{post.content}</p>
        <p>{post._like_count || 0} likes</p>
      </div>
    )

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
