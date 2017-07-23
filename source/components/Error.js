import React from 'react'
import { Link } from 'react-router-dom'

const Error = (props) => (
  <div>
    <h1>Whoops</h1>
    <p>{props.message ? props.message : 'Couldn\'t find that page'}</p>
    <Link to="/">Go to the homepage</Link>
  </div>
)

export default Error
