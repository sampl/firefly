import React from 'react'
import { Link } from 'react-router-dom'

import PostLikesProvider from '../../data/PostLikesProvider'
import UserLikeProvider from '../../data/UserLikeProvider'
import LikeCount from '../postLikes/LikeCount'
import LikeButton from '../postLikes/LikeButton'
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
    <PostLikesProvider post={post} render={ ({loading, error, postLikes}) => (
      <LikeCount loading={loading} error={error} postLikes={postLikes} />
    )} />
    <UserLikeProvider post={post} render={ ({loading, error, userLike}) => (
      <LikeButton loading={loading} error={error} userLike={userLike} post={post} />
    )} />
    <Link to={`/${post.slug}/edit`}>Edit</Link>
  </Wrapper>
}

export default Post
