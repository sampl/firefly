import Firebase from 'firebase/app'
import { FirestoreProvider } from 'react-firestore'
import React from 'react'
import ReactGA from 'react-ga'
import { BrowserRouter, Route } from 'react-router-dom'

import '../styles/global'
import ErrorBoundary from './ErrorBoundary'
import Routes from './Routes'
import Layout from './layout/Layout'

const App = () => (
  <FirestoreProvider firebase={Firebase}>
    <BrowserRouter>
      <ErrorBoundary>
        <Layout>
          <Route path="/" component={Analytics}/>
          <Routes />
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  </FirestoreProvider>
)

// Track Google Analytics page view for every route
// https://github.com/react-ga/react-ga/issues/122#issuecomment-319546248
const Analytics = ({location}) => {
  const page = location.pathname + location.search
  ReactGA.set({ page })
  ReactGA.pageview(page)
  return null
}

export default App
