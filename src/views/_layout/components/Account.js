import React from 'react'

import logIn from '../../../actions/logIn'
import AuthProvider from '../../../data/AuthProvider'
import IconAccount from './ic_account_circle_black_24px'

import {
  AppLink,
} from '../../../styles/global'

const Account = ({loading, auth, error}) => (
  <AuthProvider render={ ({loading, auth, error}) => {

    if (error) {
      return '⚠️ login error'
    }

    if (loading) {
      return '...'
    }

    if (auth) {
      return <AppLink to={`/me`}><IconAccount /></AppLink>
    }

    return <button onClick={logIn}>log in</button>

  }}/>
)

export default Account
