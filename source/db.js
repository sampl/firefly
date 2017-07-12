import Firebase from 'firebase'
import firebaseConfigLive from '../firebase-config-live.json'
import firebaseConfigStage from '../firebase-config-stage.json'

if (window.production) {
  Firebase.initializeApp(firebaseConfigLive)
} else {
  Firebase.initializeApp(firebaseConfigStage)
}

// debugging
window.Firebase = Firebase
