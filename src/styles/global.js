import styled from 'styled-components'
import { injectGlobal } from 'styled-components'

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
`

const Wrapper = styled.div`
  max-width: 500px;
  margin: 2rem auto;
`

export {
  Wrapper,
}
