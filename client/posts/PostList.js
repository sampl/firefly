import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import Post from '../../models/Post'
import Error from '../_util/Error'

import AdminOnly from '../_util/AdminOnly'
import LoggedInOnly from '../_util/LoggedInOnly'
import LoggedOutOnly from '../_util/LoggedOutOnly'

class PostList extends React.Component {

  constructor(props) {
    super(props)
    this._get = this._get.bind(this)
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    this._isMounted = true
    this._get()
    Post.on('change', this._get)
  }

  componentWillUnmount() {
    this._isMounted = false
    Post.removeListener('change', this._get)
  }

  _get() {
    Post.getAll().then( (posts) => {
      if (this._isMounted) {
        this.setState({
          posts,
        })
      }
    }).catch( (err) => {
      if (this._isMounted) {
        this.setState({
          error: err.message
        })
      }
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
        <h1>FireFly</h1>

        <Link to={'/posts/new'}>new post</Link>

        {posts}

        <Link to='/404'>a page that doesn't exist</Link>
        <br/>
        <Link to='/posts/123'>a *post* that doesn't exist</Link>

      </div>
    )
  }
}

export default PostList
