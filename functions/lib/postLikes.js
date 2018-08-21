const admin = require('firebase-admin')

// update like count on posts when postLikes are changed
exports.updatePostLikeCount = change => {
  console.log('updating post like count')
  
  const postId = change.after.exists ? change.after.data().post : change.before.data().post

  const getNumberOfPostLikes = () => {
    return admin.firestore()
      .collection('postLikes')
      .where('post', '==', postId)
      .get()
      .then( snapshot => snapshot.size)
  }

  const setPostLikeCount = likeCount => {
    return admin.firestore()
      .collection('posts')
      .doc(postId)
      .update({
        _likeCount: likeCount,
      })
  }

  return getNumberOfPostLikes()
    .then(setPostLikeCount)
}
