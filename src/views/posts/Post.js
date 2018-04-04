import React from 'react'
import { Link } from 'react-router-dom'

import Error from '../Error'
import {
  Wrapper
} from '../../styles/global'

const Post = ({loading, post, error}) => {

  if (loading) {
    return <Wrapper>
      <h1>Loading post...</h1>
      <p>...</p>
    </Wrapper>
  }

  if (error || !post) {
    return <Error error={error} />
  }

  return <Wrapper>
    <h1>{post.title}</h1>
    <p>{post.content}</p>
    <Link to={`/${post.slug}/edit`}>Edit</Link>
  </Wrapper>
}

export default Post
