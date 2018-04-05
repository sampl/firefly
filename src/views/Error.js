import React from 'react'
import { Link } from 'react-router-dom'

import {
  Wrapper
} from '../styles/global'

const Error = ({error}) => (
  <Wrapper>
    <h1>Whoops</h1>
    <p>{`Sorry, something went wrong. We're looking into it.`}</p>
    <div style={{fontFamily: 'monospace'}}>{error ? error.message : null}</div>
    <Link to="/">Go to the homepage</Link>
  </Wrapper>
)

export default Error
