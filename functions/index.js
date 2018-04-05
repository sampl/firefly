const functions = require('firebase-functions')
const Algolia = require('algoliasearch')

// you must create config variables with
// firebase functions:config:set algolia.app_id="YOUR ALGOLIA APP ID HERE" algolia.admin_key="YOUR ALGOLIA ADMIN KEY HERE"
// https://firebase.google.com/docs/functions/config-env
let algolia = Algolia(functions.config().algolia.app_id, functions.config().algolia.admin_key)
let postIndex = algolia.initIndex('posts')

// Algolia search - update search index
// https://www.algolia.com/doc/tutorials/indexing/3rd-party-service/firebase-algolia/
exports.updatePostInSearchIndex = functions.firestore.document('posts/{postId}').onWrite( (change, context) => {
  console.log('updating post in search index')
  const post = change.after.data()

  if (!post) {
    return postIndex.deleteObject(context.params.postId)
  }

  post.objectID = context.params.postId
  return postIndex.saveObject(post)
})
