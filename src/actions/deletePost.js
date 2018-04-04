import Firebase from 'firebase'

const deletePost = (post) => {
  console.log(`deleting post`)

  return Firebase.firestore().collection('posts').doc(post.id).delete()
    .catch( error => {
      alert(`Whoops, couldn't delete the post: ${error.message}`)
    })
}

export default deletePost
