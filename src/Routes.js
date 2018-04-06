import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Posts from './views/posts/Posts'
import Post from './views/posts/Post'
import PostEdit from './views/posts/PostEdit'
import PostNew from './views/posts/PostNew'
import Search from './views/search/Search'
import User from './views/user/User'
import Error from './views/Error'
import {
  PageContainer,
} from './styles/layout'

const Routes = ({location}) => (
  // https://codesandbox.io/embed/YE6l8EmR9
  <TransitionGroup component={PageContainer}>
    <CSSTransition key={location.pathname} classNames="fade" timeout={1000} mountOnEnter={true} unmountOnExit={true}>
      <Switch location={location}>
        <Route exact path="/" component={Posts} />
        <Route path="/new" component={PostNew} />
        <Route path="/search" component={Search} />
        <Route path="/me" component={User} />
        <Route path="/:slug/edit" render={ ({match}) => <PostEdit slug={match.params.slug} /> } />
        <Route path="/:slug" render={ ({match}) => <Post slug={match.params.slug} /> } />
        <Route component={Error} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
)

export default withRouter(Routes)
