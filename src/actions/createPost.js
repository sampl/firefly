import Firebase from 'firebase'
import ReactGA from 'react-ga'
import slugify from 'slugify'

import { prepareDocForCreate } from '../data/firestore_utils'

const createPost = values => {

  ReactGA.event({
    category: 'Post',
    action: 'Create post',
  })

  values.slug = slugify(values.title, {lower: true})

  return Firebase.firestore().collection('posts').add(prepareDocForCreate(values))
    .then( () => values)
    .catch( error => {
      alert(`Whoops, couldn't create the post: ${error.message}`)
    })
}

export default createPost
