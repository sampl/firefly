import React from 'react'

import likePost from '../../actions/likePost'
import unlikePost from '../../actions/unlikePost'
import UserLikeProvider from '../../data/UserLikeProvider'
import AuthProvider from '../../data/AuthProvider'

const LikeButton = ({post}) => (
  <AuthProvider render={ ({auth}) => (
    <UserLikeProvider post={post} render={ ({loading, error, userLike}) => {
      if (!auth) return null

      return <button disabled={loading || error} onClick={ () => {
          if (userLike) {
            unlikePost(userLike)
          } else {
            likePost(post)
          }
        }}>
        {userLike ? 'unlike' : 'like'}
      </button>
    }} />
  )} />
)

export default LikeButton
