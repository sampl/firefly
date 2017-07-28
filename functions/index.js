// get started with functions: https://firebase.google.com/docs/functions/get-started
// see example: https://github.com/firebase/functions-samples/blob/master/fulltext-search/functions/index.js

var admin = require('firebase-admin')
var functions = require('firebase-functions')
var Algolia = require('algoliasearch')

admin.initializeApp(functions.config().firebase)
var algolia = Algolia(functions.config().algolia.app_id, functions.config().algolia.api_key)

// Algolia search - update search index
// https://www.algolia.com/doc/tutorials/indexing/3rd-party-service/firebase-algolia/
// you must create config variables with: firebase functions:config:set algolia.app_key="YOUR ALGOLIA API KEY HERE" algolia.app_id="YOUR ALGOLIA APP ID HERE"
// see https://firebase.google.com/docs/functions/config-env
exports.updateSearchIndex = functions.database.ref('/post/{post_key}').onWrite( function(event) {
  var index = algolia.initIndex('posts')
  var post = event.data.val()
  if (post === null) {
    return index.deleteObject(event.params.post_key)
  } else {
    post.objectID = event.params.post_key
    return index.saveObject(post)
  }
})

// when someone adds/edits a post_like, increment that post's "like_count" attr
// https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions
exports.updatePostLikeCount = functions.database.ref('/post_like/{post_key}').onWrite( function(event) {
  var direction = event.data.val() ? 1 : -1
  var post = event.data.val() ? event.data.val().post : event.data.previous.val().post
  admin.database().ref(`post/${post}/_like_count`).transaction(function(likes) {
    return (likes || 0) + direction
  })
  return
})
