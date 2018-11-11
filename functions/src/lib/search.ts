const functions = require('firebase-functions')
const Algolia = require('algoliasearch')

const ALGOLIA_APP_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.admin_key
let algolia = Algolia(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)
let postIndex = algolia.initIndex('posts')

// Algolia search - update search index
// https://www.algolia.com/doc/tutorials/indexing/3rd-party-service/firebase-algolia/
exports.updatePostInSearchIndex = (change, context) => {
  const post = change.after.data()

  if (!post) {
    return postIndex.deleteObject(context.params.postId)
  }

  post.objectID = context.params.postId
  return postIndex.saveObject(post)
}
