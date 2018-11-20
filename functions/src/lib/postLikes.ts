import * as admin from "firebase-admin";

// update _likeCount on a post when it's liked or unliked
export function updatePostLikeCount(change, context) {
  const postId = change.after.exists ? change.after.data().postId : change.before.data().postId;
  return getNumberOfPostLikes(postId)
    .then(count => setPostLikeCount(postId, count) );
}

function getNumberOfPostLikes(postId: string) {
  return admin.firestore()
    .collection('postLikes')
    .where('postId', '==', postId)
    .get()
    .then( snapshot => snapshot.size);
}

function setPostLikeCount(postId: string, count: number) {
  return admin.firestore()
    .collection('posts')
    .doc(postId)
    .update({
      _likeCount: count,
    });
}
