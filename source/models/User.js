import Supermodel from './Supermodel'
import Firebase from 'firebase'
import Moment from 'moment'
import Async from 'async'

var User = Object.create(Supermodel)

User.init({
  name: 'User',
  location: '/user',
})

// override the Supermodel create method
User.create = function(user, callback) {
  callback(new Error('users are created when they sign in'), null)
}

User.loginWithGoogle = function() {
  var provider = new Firebase.auth.GoogleAuthProvider()
  Firebase.auth().signInWithPopup(provider).then(function(result) {
    // TODO - create user profile if they haven't logged in before
    this.update(result.user.uid, {
      last_login: Moment().format()
    }, function(err, key){
      if (err) {
        console.error('Could not update profile for user '+key)
      }
    })
  }.bind(this)).catch(function(err){
    alert(err.message)
  })
}

User.logOut = function() {
  Firebase.auth().signOut()
}

User.isLoggedIn = function() {
  return Firebase.auth().currentUser ? true : false
}

// TODO - restructure these synchronous on-offs into their own model or something?
User.getCurrentUserId = function() {
  return Firebase.auth().currentUser.uid
}

// TODO - refactor using async parallel or similar
User.getCurrentUser = function(callback) {
  var currentUser = Firebase.auth().currentUser
  if (currentUser) {
    this.get(currentUser.uid, function(err, user){

      if (err) {
        callback(err, null)
      } else {
        // add attributes from Firebase.auth().currentUser
        user.displayName = currentUser.displayName
        user.email = currentUser.email
        user.emailVerified = currentUser.emailVerified
        user.isAnonymous = currentUser.isAnonymous
        user.phoneNumber = currentUser.phoneNumber
        user.photoURL = currentUser.photoURL
        user.uid = currentUser.uid

        // TODO - listen for admin changes and fire 'change' event
        Firebase.database().ref('admin').child(currentUser.uid).once('value').then(function(snap) {
          if (snap.val()) {
            user.isAdmin = true
          }
          callback(null, user)
        }).catch(function(err){
          callback(err, null)
        })
      }

    })
  } else {
    callback(new Error('Not signed in'), null)
  }
}

Firebase.auth().onAuthStateChanged( function(){
  this.emit('change')
}.bind(User))

export default User

// debugging
window.User = User
