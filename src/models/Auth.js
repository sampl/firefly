import Firebase from 'firebase'
import Moment from 'moment'
import EventEmitter from 'events'
import User from '../models/User'

// This is a thin wrapper around Firebase login/logout functions.
// This isn't really a model--there's no "Auth" top-level database node.
// It's in its own file to keep "import Firebase" out of the view layer
// and separate from Users to keep that model simple (auth is inherently weird)

let Auth = Object.create(new EventEmitter())

Auth.loginWithGoogle = function() {
  let provider = new Firebase.auth.GoogleAuthProvider()
  return Firebase.auth().signInWithPopup(provider).then( (result) => {

    // save at least something so we have a complete list of users
    // (Firebase doesn't give us an API for the whole list)
    let new_data = {
      metadata: {
        last_login: Moment().format(),
      },
    }

    // TODO - use promises better here
    User.update(result.user.uid, new_data).then( (updated_user) => {
      console.log('Saved user and last login')
    }).catch( (err) => {
      console.error('Could not update user '+result.user.uid)
    })

  })
}

Auth.logOut = function() {
  Firebase.auth().signOut()
}

Auth.getLoggedInUser = function() {
  return Firebase.auth().currentUser
}

// TODO - listen for admin changes and fire 'change' event?
Auth.getAdminStatus = function() {
  return Firebase.database().ref('admin').child(Firebase.auth().currentUser.uid).once('value').then( (snap) => {
    return snap.val() ? true : false
  })
}

Firebase.auth().onAuthStateChanged( () => {
  Auth.emit('change')
})

export default Auth

// debugging
window.Auth = Auth
