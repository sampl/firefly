import React from 'react'
import { Link } from 'react-router-dom'

import Routes from '../Routes'
import User from './User'
import {
  Wrapper
} from '../styles/global'

const App = () => (
  <Wrapper>
    <Link to="/">Firefly</Link>

    <div style={{float: 'right'}}>
      <Link to="/search">🔎</Link>
      {' '}
      <User />
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
