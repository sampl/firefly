// import Firebase
// guide here: https://firebase.google.com/docs/web/setup
import Firebase from 'firebase'

// config
var firebaseConfig = require('../firebase-config-stage.json')

// start our Firebase app
Firebase.initializeApp(firebaseConfig)
