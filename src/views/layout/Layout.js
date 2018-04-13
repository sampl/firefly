import React from 'react'

import logIn from '../../actions/logIn'
import AuthProvider from '../../data/AuthProvider'
import IconSearch from './ic_search_black_24px'
import IconAccount from './ic_account_circle_black_24px'

import {
  AppWrapper,
  Header,
  Logo,
  Footer,
} from '../../styles/layout'
import {
  AppLink,
} from '../../styles/global'

const Layout = ({children}) => (
  <AppWrapper>

    <Header>
      <Logo to="/">Firefly</Logo>

      <div style={{float: 'right'}}>
        <AppLink to="/search">
          <IconSearch />
        </AppLink>
        {' '}
        <AuthProvider loading="..." error="⚠️ login error">
          { auth => {
            if (auth) {
              return <AppLink to={`/account`}><IconAccount /></AppLink>
            }

            return <button onClick={logIn}>log in</button>
          }}
        </AuthProvider>
      </div>
    </Header>

    {children}

    <Footer>&copy; {(new Date()).getFullYear()}</Footer>

  </AppWrapper>
)

export default Layout
