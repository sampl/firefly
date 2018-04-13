import React from 'react'

import PostsProvider from '../../data/PostsProvider'
import AuthProvider from '../../data/AuthProvider'
import {
  Page,
  AppLink,
} from '../../styles/global'

const Posts = () => (
  <Page>
    <PostsProvider>
      { posts => {
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
    </PostsProvider>
  </Page>
)

export default Posts
