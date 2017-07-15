import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'

// components
import Home from        '../Home'
import Post from        '../posts/Post'
import Posts from       '../posts/Posts'
import PostEdit from   '../posts/PostEdit'
import PostCreate from '../posts/PostCreate'
import Login from       '../user/Login'
import Profile from     '../user/Profile'
import Error from       '../Error'

class Routes extends React.Component {
  render() {
    return (
      <Switch location={this.props.location}>
        <Route exact path="/" component={Home} />
        <Route path="/posts/:post_key/edit" component={PostEdit} />
        <Route path="/posts/new" component={PostCreate} />
        <Route path="/posts/:post_key" component={Post} />
        <Route path="/posts" component={Posts} />
        <Route path="/login" component={Login} />
        <Route path="/me" component={Profile} />
        <Route component={Error} />
      </Switch>
    )
  }
}

export default Routes
