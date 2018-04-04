import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PostsProvider from './data/PostsProvider'
import PostSlugProvider from './data/PostSlugProvider'

import Posts from './views/posts/Posts'
import Post from './views/posts/Post'
import PostEdit from './views/posts/PostEdit'
import PostNew from './views/posts/PostNew'
import Error from './views/Error'

const Routes = () => (
  <Switch>
    <Route exact path="/" render={ () => (
      <PostsProvider render={ ({loading, posts, error}) => (
        <Posts loading={loading} posts={posts} error={error} />
      )} />
    )} />

    <Route path="/new" component={PostNew} />

    <Route path="/:slug/edit" render={ ({match}) => (
      <PostSlugProvider slug={match.params.slug} render={ ({loading, post, error}) => (
        <PostEdit loading={loading} post={post} error={error} />
      )} />
    )} />

    <Route path="/:slug" render={ ({match}) => (
      <PostSlugProvider slug={match.params.slug} render={ ({loading, post, error}) => (
        <Post loading={loading} post={post} error={error} />
      )} />
    )} />

    <Route component={Error} />
  </Switch>
)

export default Routes
