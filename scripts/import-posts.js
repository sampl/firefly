let firebase = require("firebase-admin")

let posts = require("./sample_posts.json")

// if run with `node test.js prod`, use on production data--otherwise use development
if (process.argv[2] == 'prod') {
  require('dotenv').config({path: __dirname+'/../.env.production'})
} else {
  require('dotenv').config({path:  __dirname+'/../.env.development'})
}

// create service account key from our env vars
// https://firebase.google.com/docs/database/admin/start
let firebaseKey = {
  type: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
  project_id: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
  token_uri: process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL
}

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseKey),
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
})

let database_ref = firebase.database().ref('/post')

posts.forEach( (post) => {
  let key = database_ref.push().key
  database_ref.child(key).update(post).then( (err) => {
    console.log('created post '+key)
  }).catch( (err) => {
    console.error('something went wrong: ', err)
  })
})
