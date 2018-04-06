import React from 'react'
import ReactGA from 'react-ga'
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
        <Route path="/" component={Analytics}/>
      </Switch>
    </CSSTransition>
  </TransitionGroup>
)

// Track Google Analytics page view for every route
// https://github.com/react-ga/react-ga/issues/122#issuecomment-319546248
const Analytics = ({location}) => {
  ReactGA.set({ page: location.pathname + location.search })
  ReactGA.pageview(location.pathname + location.search)
  return null
}

export default withRouter(Routes)
