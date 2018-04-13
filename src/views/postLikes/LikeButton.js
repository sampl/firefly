import React from 'react'

import likePost from '../../actions/likePost'
import unlikePost from '../../actions/unlikePost'
import UserLikeProvider from '../../data/UserLikeProvider'
import AuthProvider from '../../data/AuthProvider'

const LikeButton = ({post}) => (
  <AuthProvider>
    { auth => {
      if (!auth) return null

      return <UserLikeProvider
        post={post}
        auth={auth}
        loading={<button disabled>...</button>}
        error={<button disabled>...</button>}
      >
        { userLike => (
          <button onClick={ () => {
            if (userLike) {
              unlikePost(userLike)
            } else {
              likePost(post)
            }
          }}>
            {userLike ? 'unlike' : 'like'}
          </button>
        )}
      </UserLikeProvider>
    }}
  </AuthProvider>
)

export default LikeButton
