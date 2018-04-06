import React from 'react'

import Error from '../Error'
import PostsProvider from '../../data/PostsProvider'
import {
  Wrapper,
  AppLink,
} from '../../styles/global'

const Posts = () => (
  <PostsProvider render={ ({loading, posts, error}) => {

    if (loading) {
      return <Wrapper>
        <p>loading posts...</p>
      </Wrapper>
    }

    if (error) {
      return <Error error={error} />
    }

    if (posts.length === 0) {
      return <Wrapper>
        <AppLink to="/new">New post</AppLink>
        <p>No posts yet!</p>
      </Wrapper>
    }

    return <Wrapper>
      <AppLink to="/new">+ New post</AppLink>
      {posts.map(post => (
        <div key={post.id}>
          <h2>
            <AppLink to={`/${post.slug}`}>{post.title}</AppLink>
          </h2>
        </div>
      ))}
    </Wrapper>

  }} />
)

export default Posts
