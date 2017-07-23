import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'

// components
import Home from        '../Home'
import PostShow from    '../posts/PostShow'
import PostList from    '../posts/PostList'
import PostEdit from    '../posts/PostEdit'
import PostCreate from  '../posts/PostCreate'
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
        <Route path="/posts/:post_key" component={PostShow} />
        <Route path="/posts" component={PostList} />
        <Route path="/login" component={Login} />
        <Route path="/me" component={Profile} />
        <Route component={Error} />
      </Switch>
    )
  }
}

export default Routes
