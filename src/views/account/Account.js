import React from 'react'
import { Route } from 'react-router-dom'

import logIn from '../../actions/logIn'
import logOut from '../../actions/logOut'
import FirebaseAuth from '../misc/FirebaseAuth'
import Error from '../misc/Error'
import Subscription from './Subscription'
import {
  Page,
} from '../../styles/layout'

const Account = () => (
  <Page>
    <Route render={({history}) => (
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
            
            <Subscription auth={auth} />
          </div>

        }}
      </FirebaseAuth>
    )} />
  </Page>
)

export default Account
