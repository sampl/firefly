import React from 'react'
import { withRouter } from 'react-router-dom'

import logIn from '../../actions/logIn'
import logOut from '../../actions/logOut'
import FirebaseAuth from '../FirebaseAuth'
import Subscription from './Subscription'
import Error from '../Error'
import {
  Page,
} from '../../styles/global'

const Account = ({history}) => (
  <Page>
    <FirebaseAuth>
      { ({isLoading, error, auth}) => {

        if (isLoading) {
          return <p>loading...</p>
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
          <p><strong>{auth.displayName}</strong></p>
          <p>{auth.email}</p>
          <button onClick={() => logOut().then( () => history.push(`/`)) }>log out</button>

          <hr />
          
          <h2>Subscription</h2>
          <Subscription auth={auth} />
        </div>

      }}
    </FirebaseAuth>
  </Page>
)

export default withRouter(Account)
