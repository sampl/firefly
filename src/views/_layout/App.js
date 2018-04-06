import React from 'react'

import Routes from '../../Routes'
import Account from './components/Account'
import IconSearch from './components/ic_search_black_24px'

import {
  AppWrapper,
  Header,
  Logo,
  Footer,
} from '../../styles/layout'
import {
  AppLink,
} from '../../styles/global'

const App = () => (
  <AppWrapper>
    <Header>
      <Logo to="/">Firefly</Logo>

      <div style={{float: 'right'}}>
        <AppLink to="/search">
          <IconSearch />
        </AppLink>
        {' '}
        <Account />
      </div>
    </Header>

    <Routes />

    <Footer>&copy; {(new Date()).getFullYear()}</Footer>

  </AppWrapper>
)

export default App
