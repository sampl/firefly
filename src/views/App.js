import React from 'react'
import { Link } from 'react-router-dom'

import AuthProvider from '../data/AuthProvider'
import User from './User'
import {
  Wrapper
} from '../styles/global'

const App = () => (
  <Wrapper>
    <h1>Firefly</h1>
    <p>Hello world</p>

    <br />

    <AuthProvider render={ ({loading, auth, error}) => (
      <User loading={loading} auth={auth} error={error} />
    )}/>

    <br />

    <Link to="posts">Show all posts</Link>

  </Wrapper>
)

export default App
