const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

// https://firebase.google.com/docs/reference/js/firebase.firestore.Settings#~timestampsInSnapshots
// temporary setting to squash error date warning
// TODO - remove once this is the firebase default behavior
admin.firestore().settings({timestampsInSnapshots: true})

const postLikes = require('./lib/postLikes')
const search = require('./lib/search')
const subscriptions = require('./lib/subscriptions')

exports.updatePostInSearchIndex = functions
  .firestore
  .document('posts/{postId}')
  .onWrite(search.updatePostInSearchIndex)

exports.updateStripeSubscription = functions
  .firestore
  .document('subscriptions/{subscriptionId}')
  .onWrite(subscriptions.updateStripeSubscription)

exports.updatePostLikeCount = functions
  .firestore
  .document('postLikes/{postLikeId}')
  .onWrite(postLikes.updatePostLikeCount)
