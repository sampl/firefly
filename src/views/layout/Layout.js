import React from 'react'

import logIn from '../../actions/logIn'
import FirebaseAuth from '../FirebaseAuth'

import {
  AppWrapper,
  Header,
  Logo,
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
          <span role="img" aria-label="search">🔎</span>
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

  </AppWrapper>
)

export default Layout
