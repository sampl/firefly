import React from 'react'
import { withRouter } from 'react-router-dom'

import logIn from '../../actions/logIn'
import logOut from '../../actions/logOut'
import AuthProvider from '../../data/AuthProvider'
import Error from '../Error'
import Subscription from './Subscription'
import {
  Page,
} from '../../styles/global'

const Account = ({loading, auth, error, history}) => (
  <Page>
    <AuthProvider render={ ({loading, auth, error}) => {

      if (loading) {
        return <p>Loading your account...</p>
      }

      if (error) {
        return <Error error={error} />
      }

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

    }}/>
  </Page>
)

export default withRouter(Account)
