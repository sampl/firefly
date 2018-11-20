import * as functions from "firebase-functions";
import * as Algolia from "algoliasearch";

const ALGOLIA_APP_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.admin_key;
const algolia = Algolia(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const postIndex = algolia.initIndex('posts');

// Algolia search - update search index
// https://www.algolia.com/doc/tutorials/indexing/3rd-party-service/firebase-algolia/
export function updatePostInSearchIndex(change, context) {
  const post = change.after.data();

  if (!post) {
    return postIndex.deleteObject(context.params.postId);
  }

  post.objectID = context.params.postId;
  return postIndex.saveObject(post);
}
