import React from 'react'
import ReactGA from 'react-ga'
import { Route } from 'react-router-dom'

import Routes from './Routes'
import Layout from './layout/Layout'

const App = () => (
  <Layout>
    <Route path="/" key="analytics-router" component={Analytics}/>
    <Routes />
  </Layout>
)

// Track Google Analytics page view for every route
// https://github.com/react-ga/react-ga/issues/122#issuecomment-319546248
const Analytics = ({location}) => {
  ReactGA.set({ page: location.pathname + location.search })
  ReactGA.pageview(location.pathname + location.search)
  return null
}

export default App
