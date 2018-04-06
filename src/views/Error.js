import React from 'react'

import {
  AppLink,
} from '../styles/global'

const Error = ({error}) => (
  <div>
    <h1>Whoops</h1>
    <p>{`Sorry, something went wrong. We're looking into it.`}</p>
    <div style={{fontFamily: 'monospace'}}>{error ? error.message : null}</div>
    <AppLink to="/">Go to the homepage</AppLink>
  </div>
)

export default Error
