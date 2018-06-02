import React from 'react'
import { FirestoreCollection } from 'react-firestore'

import Error from '../Error'
import AuthProvider from '../../data/AuthProvider'
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
          return [
            <AppLink to="/new">New post</AppLink>,
            <p>No posts yet!</p>
          ]
        }

        return <div>
          <AuthProvider>
            { auth => (
              auth ? <AppLink to="/new">+ New post</AppLink> : null
            )}
          </AuthProvider>
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
