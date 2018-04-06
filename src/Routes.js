import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Posts from './views/posts/Posts'
import Post from './views/posts/Post'
import PostEdit from './views/posts/PostEdit'
import PostNew from './views/posts/PostNew'
import Search from './views/search/Search'
import User from './views/user/User'
import Error from './views/Error'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Posts} />
    <Route path="/new" component={PostNew} />
    <Route path="/search" component={Search} />
    <Route path="/me" component={User} />
    <Route path="/:slug/edit" render={ ({match}) => <PostEdit slug={match.params.slug} /> } />
    <Route path="/:slug" render={ ({match}) => <Post slug={match.params.slug} /> } />
    <Route component={Error} />
  </Switch>
)

export default Routes
