import Firebase from 'firebase'

const logIn = () => {
  return logInWithGoogle()
    .then( user => {
      console.log(`logged in as ${user.displayName}`)
    }).catch( error => {
      console.error('could not sign in', error)
    })
}

const logInWithGoogle = () => {
  let provider = new Firebase.auth.GoogleAuthProvider()
  return Firebase.auth().signInWithRedirect(provider).then(result => result.user)
}

export default logIn
