import Firebase from 'firebase/app'
import { FirestoreProvider } from 'react-firestore'
import React from 'react'
import ReactGA from 'react-ga'
import { BrowserRouter, Route } from 'react-router-dom'

import ErrorBoundary from './misc/ErrorBoundary'
import Routes from './Routes'
import Layout from './layout/Layout'
import '../styles/global'

const App = () => (
  <FirestoreProvider firebase={Firebase}>
    <BrowserRouter>
      <ErrorBoundary>
        <Layout>
          <Route path="/" component={ScrollToTop}/>
          <Route path="/" component={Analytics}/>
          <Routes />
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  </FirestoreProvider>
)

// scroll to top on route change
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md#scroll-to-top
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }
  render() {
    return null
  }
}

// Track Google Analytics page view for every route
// https://github.com/react-ga/react-ga/issues/122#issuecomment-319546248
const Analytics = ({location}) => {
  const page = location.pathname + location.search
  ReactGA.set({ page })
  ReactGA.pageview(page)
  return null
}

export default App
