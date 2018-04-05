import Firebase from 'firebase'

import { prepareDocForCreate } from '../data/firestore_utils'

const likePost = (post) => {
  console.log(`liking post`)
  const like = prepareDocForCreate({
    user: Firebase.auth().currentUser.uid,
    post: post.id,
  })
  return Firebase.firestore().collection('postLikes').add(like)
}

export default likePost
