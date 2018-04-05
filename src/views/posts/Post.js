import React from 'react'
import { Link } from 'react-router-dom'

import AuthProvider from '../../data/AuthProvider'
import PostSlugProvider from '../../data/PostSlugProvider'
import LikeCount from '../postLikes/LikeCount'
import LikeButton from '../postLikes/LikeButton'
import Error from '../Error'
import {
  Wrapper
} from '../../styles/global'

const Post = ({slug}) => (
  <PostSlugProvider slug={slug} render={ ({loading, post, error}) => {

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
      <LikeCount post={post} />
      <LikeButton post={post} />
      <AuthProvider render={ ({auth}) => auth ? <Link to={`/${post.slug}/edit`}>Edit</Link> : null } />
    </Wrapper>

  }} />
)

export default Post
