import React from 'react'

import PostLikesProvider from '../../data/PostLikesProvider'

const LikeCount = ({post}) => (
  <PostLikesProvider post={post} loading="..." error="? likes">
    { postLikes => {
      const label = postLikes.length === 1 ? 'like' : 'likes'
      return <span>{postLikes.length} {label}</span>
    }}
  </PostLikesProvider>
)

export default LikeCount
