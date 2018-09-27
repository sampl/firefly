import React from 'react'
import { FirestoreCollection } from 'react-firestore'

import likePost from '../../actions/likePost'
import unlikePost from '../../actions/unlikePost'
import FirebaseAuth from '../misc/FirebaseAuth'

const LikeButton = ({post}) => (
  <FirebaseAuth>
    { ({isLoading, error, auth}) => {

      if (!auth || isLoading || error) return null

      return <FirestoreCollection
        path={'postLikes'}
        filter={[
          ['postId', '==', post.id],
          ['createdBy', '==', auth.uid],
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
  </FirebaseAuth>
)

export default LikeButton
