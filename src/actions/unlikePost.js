import Firebase from 'firebase/app'
import ReactGA from 'react-ga'

const unlikePost = userLike => {

  ReactGA.event({
    category: 'Post',
    action: 'Unlike post',
  })

  return Firebase.firestore()
    .collection('postLikes')
    .doc(userLike.id)
    .delete()
}

export default unlikePost
