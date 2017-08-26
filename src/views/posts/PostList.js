import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import Post from '../../models/Post'
import Error from '../_util/Error'
import Loading from '../_util/Loading'
import LoggedInOnly from '../_util/LoggedInOnly'

class PostList extends React.Component {

  constructor(props) {
    super(props)
    this._get = this._get.bind(this)
    this.state = {
      loading: true,
      posts: [],
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
          loading: false,
          posts,
        })
      }
    }).catch( (err) => {
      if (this._isMounted) {
        this.setState({
          loading: false,
          error: err.message,
        })
      }
    })
  }

  render() {
    if (this.state.loading) {
      return(<Loading />)
    }
    if (this.state.error) {
      return (<Error message={this.state.error}/>)
    }

    let posts = this.state.posts.sort((a, b) => (a._like_count || 0) < (b._like_count || 0))

    posts = _.map(posts, (post) =>
      <div key={post.key}>
        <Link to={'/posts/'+post.slug}>
          <h2>{post.title}</h2>
        </Link>
        <p>{post._like_count || 0} {post._like_count === 1 ? 'like' : 'likes'}</p>
        <p>{post.content}</p>
        <br/>
      </div>
    )

    return (
      <div>
        <LoggedInOnly>
          <Link to={'/posts/new'}>new post</Link>
        </LoggedInOnly>
        <br/>
        <br/>
        {posts}
      </div>
    )
  }
}

export default PostList
