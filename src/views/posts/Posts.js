import React from 'react'
import { FirestoreCollection } from 'react-firestore'

import Error from '../Error'
import {
  Page,
  AppLink,
} from '../../styles/global'

const Posts = () => (
  <Page>
    <AppLink to="/new">New post</AppLink>
    <FirestoreCollection path={'posts'}>
      { ({error, isLoading, data}) => {

        if (error) {
          return <Error error={error} />
        }

        if (isLoading) {
          return <p>loading...</p>
        }

        const posts = data

        if (posts.length === 0) {
          return <p>No posts yet!</p>
        }

        return <div>
          {posts.map(post => (
            <h2 key={post.id}>
              <AppLink to={`/${post.slug}`}>{post.title}</AppLink>
            </h2>
          ))}
        </div>

      }}
    </FirestoreCollection>
  </Page>
)

export default Posts
