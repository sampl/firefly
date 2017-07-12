import React from 'react'
import {Link} from 'react-router-dom'

import AdminOnly from './_util/AdminOnly'
import LoggedInOnly from './_util/LoggedInOnly'
import LoggedOutOnly from './_util/LoggedOutOnly'

const Home = () => (
  <div>
    <h1>Welcome Home!</h1>
    <Link to='/posts'>show posts</Link>
    <br/>
    <Link to='/404'>a page that doesn't exist</Link>

    <br/>
    <br/>
    
    <LoggedOutOnly>You are logged out</LoggedOutOnly>
    <LoggedInOnly>You're logged in<AdminOnly>--and you're an admin too</AdminOnly>!</LoggedInOnly>

  </div>
)

export default Home
