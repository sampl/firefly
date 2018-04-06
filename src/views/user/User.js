import React from 'react'

import logOut from '../../actions/logOut'
import AuthProvider from '../../data/AuthProvider'
import Error from '../Error'
import {
  Wrapper,
} from '../../styles/global'

const User = ({loading, auth, error}) => (
  <AuthProvider render={ ({loading, auth, error}) => {

    if (loading) {
      return <Wrapper>
        <p>Loading user...</p>
      </Wrapper>
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
      <button onClick={logOut}>log out</button>
    </div>

  }}/>
)

export default User
