import React from 'react'

import Error from '../Error'
import {
  Wrapper
} from '../../styles/global'

const Post = ({loading, post, error}) => {

  if (error) {
    return <Error error={error} />
  }

  if (loading) {
    return <Wrapper>
      <h1>Loading post...}</h1>
      <p>...</p>
    </Wrapper>
  }

  return <Wrapper>
    <h1>{post.title}</h1>
    <p>{post.content}</p>
  </Wrapper>
}

export default Post
