import React from 'react'

import AuthProvider from '../../data/AuthProvider'
import PostSlugProvider from '../../data/PostSlugProvider'
import LikeCount from '../postLikes/LikeCount'
import LikeButton from '../postLikes/LikeButton'
import {
  AppLink,
  Page,
} from '../../styles/global'

const Post = ({slug}) => (
  <Page>
    <PostSlugProvider slug={slug}>
      { post => (
        <div>
          <h1>{post.title}</h1>
          <LikeCount post={post} />
          <LikeButton post={post} />
          <p>{post.content}</p>
          <AuthProvider>
            {auth => (
              auth ? <AppLink to={`/${post.slug}/edit`}>Edit</AppLink> : null
            )}
          </AuthProvider>
        </div>
      )}
    </PostSlugProvider>
  </Page>
)

export default Post
