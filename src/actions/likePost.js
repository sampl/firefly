import Firebase from 'firebase'
import ReactGA from 'react-ga'

import { prepareDocForCreate } from '../data/firestore_utils'

const likePost = post => {

  ReactGA.event({
    category: 'Post',
    action: 'Like post',
  })

  const like = prepareDocForCreate({
    user: Firebase.auth().currentUser.uid,
    post: post.id,
  })
  return Firebase.firestore().collection('postLikes').add(like)
}

export default likePost
