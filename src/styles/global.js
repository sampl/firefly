import styled from 'styled-components'
import { injectGlobal } from 'styled-components'
import { Link } from 'react-router-dom'

import colors from './colors'

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

const Logo = styled(Link)`
  color: ${colors.black};
  font-weight: 700;
  text-decoration: none;
`

const AppLink = styled(Link)`
  color: ${colors.blue};
  text-decoration: none;

  &:hover,
  &:active {
    text-decoration: underline;
  }
`

const Header = styled.div`
  margin: 0 0 2rem;
`

const Footer = styled.div`
  text-align: center;
  font-size: .9rem;
  color: ${colors.lightGray};
  margin: 4rem 0 0;
`

export {
  Wrapper,
  Logo,
  AppLink,
  Header,
  Footer,
}
