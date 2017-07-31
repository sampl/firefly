// get started with functions: https://firebase.google.com/docs/functions/get-started
// see example: https://github.com/firebase/functions-samples/blob/master/fulltext-search/functions/index.js

let admin = require('firebase-admin')
let functions = require('firebase-functions')
let Algolia = require('algoliasearch')

admin.initializeApp(functions.config().firebase)
let algolia = Algolia(functions.config().algolia.app_id, functions.config().algolia.api_key)

// Algolia search - update search index
// https://www.algolia.com/doc/tutorials/indexing/3rd-party-service/firebase-algolia/
// you must create config variables with: firebase functions:config:set algolia.app_key="YOUR ALGOLIA API KEY HERE" algolia.app_id="YOUR ALGOLIA APP ID HERE"
// see https://firebase.google.com/docs/functions/config-env
exports.updateSearchIndex = functions.database.ref('/post/{post_key}').onWrite( (event) => {
  let index = algolia.initIndex('posts')
  let post = event.data.val()
  if (post === null) {
    return index.deleteObject(event.params.post_key)
  } else {
    post.objectID = event.params.post_key
    return index.saveObject(post)
  }
})

// when someone adds/edits a post_like, increment that post's "like_count" attr
// https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions
exports.updatePostLikeCount = functions.database.ref('/post_like/{post_key}').onWrite( (event) => {
  let direction = event.data.val() ? 1 : -1
  let post = event.data.val() ? event.data.val().post : event.data.previous.val().post

  // test if there's still a post to increment/decrement
  // for ex: if I delete a post, it's likes will get deleted, and this will run
  // do decrement the count of a post that doens't exist (adding a new crappy post)
  return admin.database().ref(`post/${post}`).once('value').then( (snap) => {
    if (snap.val()) {
      admin.database().ref(`post/${post}/_like_count`).transaction( (num_likes) => {
        return (num_likes || 0) + direction
      })
      return
    } else {
      return
    }
  })

})

// when someone deletes a post, delete all post_likes that liked that post
exports.deleteOldPostLikes = functions.database.ref('/post/{post_key}').onWrite( (event) => {
  if (event.data.val() === null) {
    return admin.database().ref("/post_like").orderByChild("post").equalTo(event.params.post_key).once('value').then( (snap) => {
      snap.forEach( (childSnap) => {
        console.log('removing post_like '+childSnap.key)
        admin.database().ref("/post_like/"+childSnap.key).remove()
      })
    })
  } else {
    return
  }
})
