import React from 'react'

import Routes from '../../Routes'
import Account from './components/Account'
import IconSearch from './components/ic_search_black_24px'

import {
  Wrapper,
  AppLink,
  Logo,
  Header,
  Footer,
} from '../../styles/global'

const App = () => (
  <Wrapper>
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

  </Wrapper>
)

export default App
