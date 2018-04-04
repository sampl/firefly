import React from 'react'

const LikeCount = ({loading, postLikes, error}) => {
  if (loading) {
    return '...'
  }
  if (error) {
    return 'error getting likes'
  }
  return <span>{postLikes.length} likes</span>
}

export default LikeCount
