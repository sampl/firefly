import React from 'react'
import { Link } from 'react-router-dom'

import Error from '../Error'
import PostsProvider from '../../data/PostsProvider'
import {
  Wrapper
} from '../../styles/global'

const Posts = () => (
  <PostsProvider render={ ({loading, posts, error}) => {

    if (loading) {
      return <Wrapper>
        <h1>All Posts</h1>
        <p>loading posts...</p>
      </Wrapper>
    }

    if (error) {
      return <Error error={error} />
    }

    if (posts.length === 0) {
      return <Wrapper>
        <h1>All Posts</h1>
        <p>No posts yet!</p>
        <Link to="/new">New post</Link>
      </Wrapper>
    }

    return <Wrapper>
      <h1>All Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          <Link to={`/${post.slug}`}>{post.title}</Link>
          <br />
        </div>
      ))}
      <br />
      <Link to="/new">+ New post</Link>
    </Wrapper>

  }} />
)

export default Posts
