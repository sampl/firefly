import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Welcome Home!</h1>
    <Link to='/posts'>show posts</Link>
    <br/>
    <Link to='/404'>a page that doesn't exist</Link>
  </div>
)

export default Home
