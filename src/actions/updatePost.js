import Firebase from 'firebase'
import { prepareDocForUpdate } from '../data/firestore_utils'

const updatePost = (postId, values) => {
  console.log(`updating existing post`)

  return Firebase.firestore().collection('posts').doc(postId).update(prepareDocForUpdate(values))
    .catch( error => {
      alert(`Whoops, couldn't edit the post: ${error.message}`)
    })
}

export default updatePost
