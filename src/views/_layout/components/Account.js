import React from 'react'
import { Link } from 'react-router-dom'

import logIn from '../../../actions/logIn'
import AuthProvider from '../../../data/AuthProvider'

const Account = ({loading, auth, error}) => (
  <AuthProvider render={ ({loading, auth, error}) => {

    if (error) {
      return '⚠️ login error'
    }

    if (loading) {
      return '...'
    }

    if (auth) {
      return <Link to={`/me`}>{auth.displayName}</Link>
    }

    return <button onClick={logIn}>log in</button>

  }}/>
)

export default Account
