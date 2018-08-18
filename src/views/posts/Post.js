import React from 'react'
import { FirestoreCollection } from 'react-firestore'

import Error from '../Error'
import FirebaseAuth from '../FirebaseAuth'
import LikeCount from '../postLikes/LikeCount'
import LikeButton from '../postLikes/LikeButton'
import {
  AppLink,
  Page,
} from '../../styles/global'

const Post = ({slug}) => (
  <Page>
    <FirestoreCollection
      path={'posts'}
      filter={['slug', '==', slug]}
    >
      { ({error, isLoading, data}) => {
        if (error || data.length === 0) {
          return <Error error={error} />
        }

        if (isLoading) {
          return <p>loading...</p>
        }

        const post = data[0]

        return <div>
          <h1>{post.title}</h1>
          <LikeCount post={post} />
          <LikeButton post={post} />
          <p>{post.content}</p>
          <FirebaseAuth>
            { ({auth}) => (
              auth ? <AppLink to={`/${post.slug}/edit`}>Edit</AppLink> : null
            )}
          </FirebaseAuth>
        </div>
      }}
    </FirestoreCollection>
  </Page>
)

export default Post
