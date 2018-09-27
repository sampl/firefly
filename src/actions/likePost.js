import Firebase from 'firebase/app'
import ReactGA from 'react-ga'

import { prepareDocForCreate } from './helpers/firestoreHelpers'

const likePost = post => {

  ReactGA.event({
    category: 'Post',
    action: 'Like post',
  })

  const like = prepareDocForCreate({
    postId: post.id,
  })

  return Firebase.firestore().collection('postLikes').add(like)
}

export default likePost
