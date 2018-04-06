import React from 'react'
import { withRouter } from 'react-router-dom'

import logOut from '../../actions/logOut'
import AuthProvider from '../../data/AuthProvider'
import Error from '../Error'
import {
  Page,
} from '../../styles/global'

const User = ({loading, auth, error, history}) => (
  <Page>
    <AuthProvider render={ ({loading, auth, error}) => {

      if (loading) {
        return <p>Loading user...</p>
      }

      if (error || !auth) {
        return <Error error={error} />
      }

      return <div>
        <img src={auth.photoURL} alt={auth.displayName} width="100" height="100" />
        <br />
        <strong>{auth.displayName}</strong>
        <br />
        {auth.email}
        <br />
        <br />
        <button onClick={() => logOut().then( () => history.push(`/`)) }>log out</button>
      </div>

    }}/>
  </Page>
)

export default withRouter(User)
