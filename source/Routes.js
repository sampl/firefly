import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom'

// components
import Home from './components/Home'
import Posts from './components/posts/Posts'
import Post from './components/posts/Post'
import Error from './components/Error'

const Routes = () => (
  <Router>
    <div>
      <div className="header">
        <Link to='/'>Firefly</Link>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/posts/:post_key" component={Post} />
        <Route path="/posts" component={Posts} />
        <Route component={Error} />
      </Switch>
    </div>
  </Router>
)

export default Routes
