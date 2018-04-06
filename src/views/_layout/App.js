import React from 'react'
import { Link } from 'react-router-dom'

import Routes from '../../Routes'
import Account from './components/Account'
import IconSearch from './components/ic_search_black_24px'

import {
  Wrapper
} from '../../styles/global'

const App = () => (
  <Wrapper>
    <Link to="/">Firefly</Link>

    <div style={{float: 'right'}}>
      <Link to="/search">
        <IconSearch />
      </Link>
      {' '}
      <Account />
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
