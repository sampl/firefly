import React from 'react'

import logIn from '../../actions/logIn'
import FirebaseAuth from '../FirebaseAuth'

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
        <FirebaseAuth loading="..." error="⚠️ login error">
          { ({auth}) => {
            if (auth) {
              return <AppLink to={`/account`}>
                <span role="img" aria-label="account">👤</span>
              </AppLink>
            }

            return <button onClick={logIn}>log in</button>
          }}
        </FirebaseAuth>
      </div>
    </Header>

    {children}

    <Footer>&copy; {(new Date()).getFullYear()}</Footer>

  </AppWrapper>
)

export default Layout
