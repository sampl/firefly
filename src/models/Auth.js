import Firebase from 'firebase'
import Moment from 'moment'
import EventEmitter from 'eventemitter3'

import User from '../models/User'

// This is a thin wrapper around Firebase login/logout functions.
// This isn't really a model--there's no "Auth" top-level database node.
// It's in its own file to keep "import Firebase" out of the view layer
// and separate from Users to keep that model simple (auth is inherently weird)

let Auth = Object.create(new EventEmitter())

Auth.loginWithGoogle = function() {
  let provider = new Firebase.auth.GoogleAuthProvider()
  return Firebase.auth().signInWithPopup(provider).then( (result) => {

    // TODO - create user profile if they haven't logged in before
    let new_data = {
      last_login: Moment().format()
    }

    // TODO - use promises better here
    User.update(result.user.uid, new_data).then( (updated_user) => {
      console.log('updated user profile w/ last login')
    }).catch( (err) => {
      console.error('Could not update profile for user '+result.user.uid)
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
