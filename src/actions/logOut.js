import Firebase from 'firebase'

const logOut = () => {
  console.log(`logged out`)
  return Firebase.auth().signOut()
}

export default logOut
