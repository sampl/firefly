import React from 'react'
import { FirestoreCollection } from 'react-firestore'

import Error from '../Error'
import FirebaseAuth from '../FirebaseAuth'
import LikeButton from './LikeButton'
import {
  InternalLink,
} from '../../styles/links'
import {
  Page,
} from '../../styles/layout'

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
          <p>
            {post._likeCount || 0}
            {' '}
            {post._likeCount && post._likeCount === 1 ? 'like' : 'likes'}
          </p>
          <LikeButton post={post} />
          <p>{post.content}</p>
          <FirebaseAuth>
            { ({auth}) => (
              auth ? <InternalLink to={`/${post.slug}/edit`}>Edit</InternalLink> : null
            )}
          </FirebaseAuth>
        </div>
      }}
    </FirestoreCollection>
  </Page>
)

export default Post
