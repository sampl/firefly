import React from 'react'

import likePost from '../../actions/likePost'
import unlikePost from '../../actions/unlikePost'

const LikeButton = ({loading, userLike, error, post}) => (
  <button disabled={loading || error} onClick={ () => {
    if (userLike) {
      unlikePost(userLike)
    } else {
      likePost(post)
    }
  }}>
    {userLike ? 'unlike' : 'like'}
  </button>
)

export default LikeButton
