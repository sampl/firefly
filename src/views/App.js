import React from 'react'

import AuthProvider from '../data/AuthProvider'
import User from './User'
import {
  Wrapper
} from '../styles/global'

const App = () => (
  <Wrapper>
    <h1>Firefly</h1>
    <p>Hello world</p>

    <AuthProvider render={ ({loading, auth, error}) => (
      <User loading={loading} auth={auth} error={error} />
    )}/>

  </Wrapper>
)

export default App
