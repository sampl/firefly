import Firebase from 'firebase/app'
import ReactGA from 'react-ga'
import slugify from 'slugify'

import { prepareDocForCreate } from './helpers/firestoreHelpers'

const createPost = values => {

  ReactGA.event({
    category: 'Post',
    action: 'Create post',
  })

  values.slug = slugify(values.title, {lower: true})
  values._likeCount = 0

  return Firebase.firestore()
    .collection('posts')
    .add(prepareDocForCreate(values))
    .then( () => values)
    .catch( error => {
      alert(`Whoops, couldn't create the post: ${error.message}`)
    })
}

export default createPost
