import React from 'react'
import ReactDOM from 'react-dom'
import Firebase from 'firebase'
// eslint-disable-next-line
import Firestore from 'firebase/firestore'
import ReactGA from 'react-ga'
import { BrowserRouter } from 'react-router-dom'

import App from './views/_layout/App'

console.log('create-react-app env:', process.env.NODE_ENV)
console.log('firefly app env:', process.env.REACT_APP_ENV)

// DATABASE
const dbConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
}
let FirebaseApp = Firebase.initializeApp(dbConfig)
window.firebase = FirebaseApp // debugging

// TRACKING
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID, {debug: true})
if (process.env.NODE_ENV === 'production') {
  window.Raven.config(process.env.REACT_APP_SENTRY_RAVEN_TRACKING_URL).install()
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
