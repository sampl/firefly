import styled from 'styled-components'
import { Link } from 'react-router-dom'

import colors from './colors'

const AppWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: grid;
  min-height: 100vh;
  grid-template-rows: 5rem auto 5rem;
  padding: 0 1rem;
`

const Header = styled.div`
  padding: 2rem 0;
`

const Logo = styled(Link)`
  color: ${colors.black};
  font-weight: 700;
  text-decoration: none;
`

const PageContainer = styled.div`
  position: relative;
`

const Footer = styled.div`
  text-align: center;
  font-size: .9rem;
  color: ${colors.lightGray};
  padding: 2rem 0;
`

export {
  AppWrapper,
  PageContainer,
  Header,
  Logo,
  Footer,
}
