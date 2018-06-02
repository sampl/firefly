import React from 'react'
import { FirestoreCollection } from 'react-firestore'

import likePost from '../../actions/likePost'
import unlikePost from '../../actions/unlikePost'
import AuthProvider from '../../data/AuthProvider'

const LikeButton = ({post}) => (
  <AuthProvider>
    { auth => {
      if (!auth) return null

      return <FirestoreCollection
        path={'postLikes'}
        filter={[
          ['post', '==', post.id],
          ['user', '==', auth.uid],
        ]}
      >
        { ({error, isLoading, data}) => {

          if (error || isLoading) {
            return <button disabled>...</button>
          }

          const userLike = data[0]

          return <button onClick={ () => {
            if (userLike) {
              unlikePost(userLike)
            } else {
              likePost(post)
            }
          }}>
            {userLike ? 'unlike' : 'like'}
          </button>
        }}
      </FirestoreCollection>
    }}
  </AuthProvider>
)

export default LikeButton
