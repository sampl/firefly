import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { updatePostInSearchIndex } from "./lib/search";
import { updateStripeSubscription } from "./lib/subscriptions";
import { updatePostLikeCount } from "./lib/postLikes";

admin.initializeApp(functions.config().firebase);

// https://firebase.google.com/docs/reference/js/firebase.firestore.Settings#~timestampsInSnapshots
// temporary setting to squash error date warning
// TODO - remove once this is the firebase default behavior
admin.firestore().settings({timestampsInSnapshots: true});

exports.updatePostInSearchIndex = functions
  .firestore
  .document('posts/{postId}')
  .onWrite(updatePostInSearchIndex);

exports.updateStripeSubscription = functions
  .firestore
  .document('subscriptions/{subscriptionId}')
  .onWrite(updateStripeSubscription);

exports.updatePostLikeCount = functions
  .firestore
  .document('postLikes/{postLikeId}')
  .onWrite(updatePostLikeCount);
