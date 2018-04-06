import Firebase from 'firebase'
import ReactGA from 'react-ga'
import { prepareDocForUpdate } from '../data/firestore_utils'

const updatePost = (postId, values) => {

  ReactGA.event({
    category: 'Post',
    action: 'Updating post',
  })

  return Firebase.firestore().collection('posts').doc(postId).update(prepareDocForUpdate(values))
    .catch( error => {
      alert(`Whoops, couldn't edit the post: ${error.message}`)
    })
}

export default updatePost
