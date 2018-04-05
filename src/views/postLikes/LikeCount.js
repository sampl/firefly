import React from 'react'

import PostLikesProvider from '../../data/PostLikesProvider'

const LikeCount = ({post}) => (
  <PostLikesProvider post={post} render={ ({loading, error, postLikes}) => {

    if (loading) {
      return '...'
    }

    if (error) {
      return 'error getting likes'
    }

    const label = postLikes.length === 1 ? 'like' : 'likes'
    return <span>{postLikes.length} {label}</span>
    
  }} />
)

export default LikeCount
