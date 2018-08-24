import styled from 'styled-components'

const AppWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;
`
const Header = styled.div`
  padding: 2rem 0;
`
const PageContainer = styled.div`
  position: relative;
`
const Page = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`

export {
  AppWrapper,
  Header,
  PageContainer,
  Page,
}
