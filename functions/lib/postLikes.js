const admin = require('firebase-admin')

// update _likeCount on a post when it's liked or unliked
exports.updatePostLikeCount = (change, context) => {
  const postId = change.after.exists ? change.after.data().postId : change.before.data().postId
  return getNumberOfPostLikes(postId)
    .then(count => setPostLikeCount(postId, count) )
}

const getNumberOfPostLikes = postId => {
  return admin.firestore()
    .collection('postLikes')
    .where('postId', '==', postId)
    .get()
    .then( snapshot => snapshot.size)
}

const setPostLikeCount = (postId, count) => {
  return admin.firestore()
    .collection('posts')
    .doc(postId)
    .update({
      _likeCount: count,
    })
}
