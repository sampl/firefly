import React from 'react'

import AuthProvider from '../../data/AuthProvider'
import PostSlugProvider from '../../data/PostSlugProvider'
import LikeCount from '../postLikes/LikeCount'
import LikeButton from '../postLikes/LikeButton'
import Error from '../Error'
import {
  Wrapper,
  AppLink,
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
      <LikeCount post={post} />
      <LikeButton post={post} />
      <p>{post.content}</p>
      <AuthProvider render={ ({auth}) => auth ? <AppLink to={`/${post.slug}/edit`}>Edit</AppLink> : null } />
    </Wrapper>

  }} />
)

export default Post
