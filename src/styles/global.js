import { injectGlobal } from 'styled-components'

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
