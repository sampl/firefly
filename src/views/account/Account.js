import React from 'react'
import { withRouter } from 'react-router-dom'

import logIn from '../../actions/logIn'
import logOut from '../../actions/logOut'
import AuthProvider from '../../data/AuthProvider'
import Subscription from './Subscription'
import {
  Page,
} from '../../styles/global'

const Account = ({history}) => (
  <Page>
    <AuthProvider>
      { auth => {

        if (!auth) {
          return <div>
            <p>Log in to see your account</p>
            <button onClick={logIn}>Log in</button>
          </div>
        }

        return <div>
          <img src={auth.photoURL} alt={auth.displayName} width="100" height="100" />
          <br />
          <strong>{auth.displayName}</strong>
          <br />
          {auth.email}
          <br />
          <button onClick={() => logOut().then( () => history.push(`/`)) }>log out</button>
          <br />
          <br />
          <h2>Subscription</h2>
          <Subscription auth={auth} />
        </div>

      }}
    </AuthProvider>
  </Page>
)

export default withRouter(Account)
