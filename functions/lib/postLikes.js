const admin = require('firebase-admin')

// update _likeCount on a post when it's liked or unliked
exports.updatePostLikeCount = (change, context) => {
  console.log('updating post like count')
  const postId = change.after.exists ? change.after.data().post : change.before.data().post
  return getNumberOfPostLikes(postId)
    .then(count => setPostLikeCount(postId, count) )
}

const getNumberOfPostLikes = postId => {
  return admin.firestore()
    .collection('postLikes')
    .where('post', '==', postId)
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
