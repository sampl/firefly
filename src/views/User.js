import React from 'react'

import logIn from '../actions/logIn'
import logOut from '../actions/logOut'
import AuthProvider from '../data/AuthProvider'

const User = ({loading, auth, error}) => (
  <AuthProvider render={ ({loading, auth, error}) => {

    if (error) {
      return '⚠️ login error'
    }

    if (loading) {
      return '...'
    }

    if (auth) {
      return <div>
        {auth.displayName}
        {' '}
        <button onClick={logOut}>log out</button>
      </div>
    }

    return <button onClick={logIn}>log in</button>

  }}/>
)

export default User
