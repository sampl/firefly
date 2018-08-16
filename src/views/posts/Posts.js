import React from 'react'
import { FirestoreCollection } from 'react-firestore'

import Error from '../Error'
import {
  Page,
  AppLink,
} from '../../styles/global'

const Posts = () => (
  <Page>
    <FirestoreCollection path={'posts'}>
      { ({error, isLoading, data}) => {

        if (error) {
          return <Error error={error} />
        }

        if (isLoading) {
          return 'loading...'
        }

        const posts = data

        if (posts.length === 0) {
          return <div>
            <AppLink to="/new">New post</AppLink>,
            <p>No posts yet!</p>
          </div>
        }

        return <div>
          <AppLink to="/new">New post</AppLink>
          {posts.map(post => (
            <div key={post.id}>
              <h2>
                <AppLink to={`/${post.slug}`}>{post.title}</AppLink>
              </h2>
            </div>
          ))}
        </div>

      }}
    </FirestoreCollection>
  </Page>
)

export default Posts
