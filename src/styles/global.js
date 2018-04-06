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
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
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
`

const Page = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`

const AppLink = styled(Link)`
  color: ${colors.blue};
  text-decoration: none;

  &:hover,
  &:active {
    text-decoration: underline;
  }
`

export {
  Page,
  AppLink,
}
