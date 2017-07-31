import Supermodel from './Supermodel'
import Firebase from 'firebase'
import Moment from 'moment'
import Async from 'async'

let User = Object.create(Supermodel)

User.init({
  name: 'User',
  location: '/user',
})

// OVERRIDE METHODS

User.create = function(user) {
  throw new Error('users are created when they sign in')
}

// LOG IN/OUT

User.loginWithGoogle = function() {
  let provider = new Firebase.auth.GoogleAuthProvider()
  return Firebase.auth().signInWithPopup(provider).then(function(result) {

    // TODO - create user profile if they haven't logged in before
    let new_data = {
      last_login: Moment().format()
    }

    // TODO - use promises better here
    this.update(result.user.uid, new_data).then(function(updated_user) {
      console.log('updated user profile w/ last login')
    }).catch(function(err){
      console.error('Could not update profile for user '+result.user.uid)
    })

  }.bind(this))
}

User.logOut = function() {
  Firebase.auth().signOut()
}

// GET

User.getLoggedInUser = function() {
  return Firebase.auth().currentUser
}

// TODO - listen for admin changes and fire 'change' event?
User.getAdminStatus = function() {
  return Firebase.database().ref('admin').child(Firebase.auth().currentUser.uid).once('value').then(function(snap) {
    return snap.val() ? true : false
  })
}


Firebase.auth().onAuthStateChanged( function(){
  this.emit('change')
}.bind(User))

export default User

// debugging
window.User = User
