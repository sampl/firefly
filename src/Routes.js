import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PostsProvider from './data/PostsProvider'
import PostSlugProvider from './data/PostSlugProvider'

import App from './views/App'
import Posts from './views/posts/Posts'
import Post from './views/posts/Post'
import Error from './views/Error'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/posts" render={ () => (
      <PostsProvider render={ ({loading, posts, error}) => (
        <Posts loading={loading} posts={posts} error={error} />
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
