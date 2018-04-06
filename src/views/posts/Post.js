import React from 'react'

import AuthProvider from '../../data/AuthProvider'
import PostSlugProvider from '../../data/PostSlugProvider'
import LikeCount from '../postLikes/LikeCount'
import LikeButton from '../postLikes/LikeButton'
import Error from '../Error'
import {
  AppLink,
  Page,
} from '../../styles/global'

const Post = ({slug}) => (
  <Page>
    <PostSlugProvider slug={slug} render={ ({loading, post, error}) => {

      if (loading) {
        return <div>
          <h1>Loading post...</h1>
          <p>...</p>
        </div>
      }

      if (error || !post) {
        return <Error error={error} />
      }

      return <div>
        <h1>{post.title}</h1>
        <LikeCount post={post} />
        <LikeButton post={post} />
        <p>{post.content}</p>
        <AuthProvider render={ ({auth}) => auth ? <AppLink to={`/${post.slug}/edit`}>Edit</AppLink> : null } />
      </div>

    }} />
  </Page>
)

export default Post
