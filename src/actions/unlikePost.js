import Firebase from 'firebase'

const unlikePost = (userLike) => {
  console.log(`unliking post`)
  return Firebase.firestore().collection('postLikes').doc(userLike.id).delete()
}

export default unlikePost
