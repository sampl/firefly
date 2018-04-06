import React from 'react'

import {
  Wrapper,
  AppLink,
} from '../styles/global'

const Error = ({error}) => (
  <Wrapper>
    <h1>Whoops</h1>
    <p>{`Sorry, something went wrong. We're looking into it.`}</p>
    <div style={{fontFamily: 'monospace'}}>{error ? error.message : null}</div>
    <AppLink to="/">Go to the homepage</AppLink>
  </Wrapper>
)

export default Error
