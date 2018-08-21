import React from 'react'
import { FirestoreCollection } from 'react-firestore'

import Error from '../Error'
import {
  AppLink,
} from '../../styles/global'
import {
  Page,
} from '../../styles/layout'

const Posts = () => (
  <Page>
    <AppLink to="/new">New post</AppLink>
    <hr/>
    <FirestoreCollection
      path={'posts'}
      sort="_likeCount:desc"
    >
      { ({error, isLoading, data}) => {

        if (error) {
          return <Error error={error} />
        }

        if (isLoading) {
          return <p>loading...</p>
        }

        if (data.length === 0) {
          return <p>No posts yet!</p>
        }

        return <div>
          {data.map(post => (
            <div key={post.id}>
              <AppLink to={`/${post.slug}`}>{post.title}</AppLink>
              <p>
                {post._likeCount || 0}
                {' '}
                {post._likeCount && post._likeCount === 1 ? 'like' : 'likes'}
              </p>
            </div>
          ))}
        </div>

      }}
    </FirestoreCollection>
  </Page>
)

export default Posts
