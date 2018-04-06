import React from 'react'

import Error from '../Error'
import PostsProvider from '../../data/PostsProvider'
import AuthProvider from '../../data/AuthProvider'
import {
  Page,
  AppLink,
} from '../../styles/global'

const Posts = () => (
  <Page>
    <PostsProvider render={ ({loading, posts, error}) => {

      if (loading) {
        return <p>loading posts...</p>
      }

      if (error) {
        return <Error error={error} />
      }

      if (posts.length === 0) {
        return [
          <AppLink to="/new">New post</AppLink>,
          <p>No posts yet!</p>
        ]
      }

      return <div>
        <AuthProvider render={ ({auth}) => (
          auth ? <AppLink to="/new">+ New post</AppLink> : null
        )}/>
        {posts.map(post => (
          <div key={post.id}>
            <h2>
              <AppLink to={`/${post.slug}`}>{post.title}</AppLink>
            </h2>
          </div>
        ))}
      </div>

    }} />
  </Page>
)

export default Posts
