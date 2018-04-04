import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './views/App'
import Error from './views/Error'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route component={Error} />
  </Switch>
)

export default Routes
