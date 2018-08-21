import styled from 'styled-components'
import { injectGlobal } from 'styled-components'
import { Link } from 'react-router-dom'

import colors from './colors'
// eslint-disable-next-line
import animation from './animation'

// GLOBAL STYLES
injectGlobal`
  *:before,
  *:after,
  * {
    box-sizing: border-box;
    font-family: sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  html,
  body {
    margin: 0;
    padding: 0;
    line-height: 1.4;
  }

  html,
  body,
  #root {
    min-height: 100vh;
  }

  p {
    margin: 0 0 1rem;
  }
`

// INTERNAL link
const AppLink = styled(Link)`
  color: ${colors.blue};
  text-decoration: none;

  &:hover,
  &:active {
    text-decoration: underline;
  }
`

export {
  AppLink,
}
