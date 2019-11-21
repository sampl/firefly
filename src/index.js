// the main file in our front-end app
// create-react-app expects a file in src/index.js and loads everything from here

import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'

import App from './views/App'

console.log('create-react-app env:', process.env.NODE_ENV)
console.log('firefly project:', process.env.REACT_APP_ENV)

// connect our app to firebase 
const dbConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
}
Firebase.initializeApp(dbConfig)

// Google Analytics
// https://github.com/react-ga/react-ga#api
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID)

// Sentry
// https://docs.sentry.io/clients/javascript/integrations/react/
window.Raven.config(process.env.REACT_APP_SENTRY_RAVEN_TRACKING_URL).install()

// render the App component to our document root with React
ReactDOM.render(<App />, document.getElementById('root'))
