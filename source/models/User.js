import Supermodel from './Supermodel'
import Firebase from 'firebase'
import Moment from 'moment'
import Async from 'async'

var Users = new Supermodel('User', '/user')

Users.create = function(user, callback) {
  callback({message: 'users are created when they sign in'}, null)
}

Users.loginWithGoogle = function() {
  var provider = new Firebase.auth.GoogleAuthProvider()
  Firebase.auth().signInWithPopup(provider).then(function(result) {
    // TODO - create user profile if they haven't logged in before
    this.update(result.user.uid, {
      last_login: Moment().format()
    }, function(){})
  }.bind(this) )
}

Users.logOut = function() {
  Firebase.auth().signOut()
}

Users.loggedIn = function() {
  return Firebase.auth().currentUser ? true : false
}

// TODO - refactor using async parallel or similar
Users.getCurrentUser = function(callback) {
  var currentUser = Firebase.auth().currentUser
  if (currentUser) {
    this.get(currentUser.uid, function(err, user){

      // add attributes from Firebase.auth().currentUser
      user.displayName = currentUser.displayName
      user.email = currentUser.email
      user.emailVerified = currentUser.emailVerified
      user.isAnonymous = currentUser.isAnonymous
      user.phoneNumber = currentUser.phoneNumber
      user.photoURL = currentUser.photoURL
      user.uid = currentUser.uid

      // TODO - listen for admin changes and fire 'change' event
      Firebase.database().ref('admin').child(currentUser.uid).once('value', function(snap) {
        if (snap.val()) {
          user.isAdmin = true
        }
        callback(err, user)
      })

    })
  } else {
    callback({message: 'not signed in'}, null)
  }
}

Firebase.auth().onAuthStateChanged( function(){
  this.emit('change')
}.bind(Users))

export default Users

// debugging
window.Users = Users
