import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

// components
import Header from  './components/_layout/Header'
import Home from    './components/Home'
import Posts from   './components/posts/Posts'
import Post from    './components/posts/Post'
import Login from   './components/user/Login'
import Profile from './components/user/Profile'
import Error from   './components/Error'

const Routes = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/posts/:post_key" component={Post} />
        <Route path="/posts" component={Posts} />
        <Route path="/login" component={Login} />
        <Route path="/me" component={Profile} />
        <Route component={Error} />
      </Switch>
    </div>
  </Router>
)

export default Routes
