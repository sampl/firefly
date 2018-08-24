// a generic error page to show whenever something goes wrong in other views

import React from 'react'

import {
  InternalLink,
} from '../../styles/links'

const Error = ({error}) => (
  <div>
    <h1>Whoops</h1>
    <p>{`Sorry, something went wrong. We're looking into it.`}</p>
    <div style={{fontFamily: 'monospace'}}>{error ? error.message : null}</div>
    <InternalLink to="/">Go to the homepage</InternalLink>
  </div>
)

export default Error
