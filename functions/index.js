// Algolia search
// you must create config variables with: firebase functions:config:set algolia.app_key="YOUR ALGOLIA API KEY HERE" algolia.app_id="YOUR ALGOLIA APP ID HERE"
// see https://firebase.google.com/docs/functions/config-env

// get started with functions: https://firebase.google.com/docs/functions/get-started
// see example: https://github.com/firebase/functions-samples/blob/master/fulltext-search/functions/index.js

var admin = require('firebase-admin')
var functions = require('firebase-functions')
var Algolia = require('algoliasearch')

admin.initializeApp(functions.config().firebase)
var algolia = Algolia(functions.config().algolia.app_id, functions.config().algolia.api_key)

// Update search index
// https://www.algolia.com/doc/tutorials/indexing/3rd-party-service/firebase-algolia/
exports.updateIndex = functions.database.ref('/post/{post_key}').onWrite( function(event) {
  var index = algolia.initIndex('posts')
  var post = event.data.val()
  if (post === null) {
    return index.deleteObject(event.params.post_key)
  } else {
    post.objectID = event.params.post_key
    return index.saveObject(post)
  }
})
