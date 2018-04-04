import Firebase from 'firebase'
import { prepareDocForUpdate } from '../data/firestore_utils'

const updatePost = (post) => {
  console.log(`updating existing post`)

  return Firebase.firestore().collection('posts').doc(post.id).update(prepareDocForUpdate(post))
    .then( () => post)
    .catch( error => {
      alert(`Whoops, couldn't edit the post: ${error.message}`)
    })
}

export default updatePost
