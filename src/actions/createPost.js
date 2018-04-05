import Firebase from 'firebase'
import slugify from 'slugify'

import { prepareDocForCreate } from '../data/firestore_utils'

const createPost = (values) => {
  console.log(`creating new post`)

  values.slug = slugify(values.title, {lower: true})

  return Firebase.firestore().collection('posts').add(prepareDocForCreate(values))
    .then( () => values)
    .catch( error => {
      alert(`Whoops, couldn't create the post: ${error.message}`)
    })
}

export default createPost
