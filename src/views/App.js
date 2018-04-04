import React from 'react'
import { Link } from 'react-router-dom'

import Routes from '../Routes'
import AuthProvider from '../data/AuthProvider'
import User from './User'
import {
  Wrapper
} from '../styles/global'

const App = () => (
  <Wrapper>
    <Link to="/">Firefly</Link>

    <div style={{float: 'right'}}>
      <AuthProvider render={ ({loading, auth, error}) => (
          <User loading={loading} auth={auth} error={error} />
        )}/>
    </div>

    <br />
    <br />

    <Routes />

    <br />
    <br />

    &copy; 2018

  </Wrapper>
)

export default App
