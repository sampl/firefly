import React from 'react'
import { Link } from 'react-router-dom'

import Error from '../Error'
import {
  Wrapper
} from '../../styles/global'

const Posts = ({loading, posts, error}) => {

  if (error) {
    return <Error error={error} />
  }

  if (loading) {
    return <Wrapper>
      <h1>All Posts</h1>
      <p>loading posts...</p>
    </Wrapper>
  }

  return <Wrapper>
    <h1>All Posts</h1>
    {posts.map(post => (
      <div key={post.id}>
        <Link to={`/${post.slug}`}>{post.title}</Link>
        <br />
      </div>
    ))}
  </Wrapper>
}

export default Posts
