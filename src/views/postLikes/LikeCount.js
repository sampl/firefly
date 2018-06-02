import React from 'react'
import { FirestoreCollection } from 'react-firestore'

const LikeCount = ({post}) => (
  <FirestoreCollection
    path={'postLikes'}
    filter={['post', '==', post.id]}
  >
    { ({error, isLoading, data}) => {
      if (error) {
        return "? likes"
      }

      if (isLoading) {
        return "..."
      }

      const postLikes = data

      const label = postLikes.length === 1 ? 'like' : 'likes'
      return <span>{postLikes.length} {label}</span>
    }}
  </FirestoreCollection>
)

export default LikeCount
