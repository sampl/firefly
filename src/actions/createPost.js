import Firebase from 'firebase'
import slugify from 'slugify'

import { prepareDocForCreate } from '../data/firestore_utils'

const createPost = (post) => {
  console.log(`creating new post`)

  post.slug = slugify(post.title, {lower: true})

  return Firebase.firestore().collection('posts').add(prepareDocForCreate(post))
    .then( () => post)
    .catch( error => {
      alert(`Whoops, couldn't create the post: ${error.message}`)
    })
}

export default createPost
