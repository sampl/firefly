import Firebase from 'firebase/app'
import ReactGA from 'react-ga'

const deletePost = post => {

  ReactGA.event({
    category: 'Post',
    action: 'Delete post',
  })

  return Firebase.firestore()
    .collection('posts')
    .doc(post.id)
    .delete()
    .catch( error => {
      alert(`Whoops, couldn't delete the post: ${error.message}`)
    })
}

export default deletePost
