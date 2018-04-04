import React from 'react'

import logIn from '../actions/logIn'
import logOut from '../actions/logOut'

const User = ({loading, auth, error}) => {
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
}

export default User
