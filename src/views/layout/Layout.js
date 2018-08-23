import React from 'react'

import logIn from '../../actions/logIn'
import FirebaseAuth from '../misc/FirebaseAuth'

import {
  AppWrapper,
  Header,
  Logo,
} from '../../styles/layout'
import {
  InternalLink,
} from '../../styles/links'

const Layout = ({children}) => (
  <AppWrapper>

    <Header>
      <Logo to="/">Firefly</Logo>

      <div style={{float: 'right'}}>
        <InternalLink to="/search">
          <span role="img" aria-label="search">🔎</span>
        </InternalLink>
        {' '}
        <FirebaseAuth loading="..." error="⚠️ login error">
          { ({auth}) => {
            if (auth) {
              return <InternalLink to={`/account`}>
                <span role="img" aria-label="account">👤</span>
              </InternalLink>
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
