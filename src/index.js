import React from 'react'
import ReactDOM from 'react-dom'
import Firebase from 'firebase'
// eslint-disable-next-line
import Firestore from 'firebase/firestore'

import App from './views/App'

// LOGGING
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

ReactDOM.render(<App />, document.getElementById('root'))
