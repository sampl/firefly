const admin = require('firebase-admin')
const Promise = require('bluebird')
const chalk = require('chalk')


// init firebase
const serviceAccount = require('./serviceAccountKey.dev.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = require('firebase-admin').firestore()

console.log(chalk.blue(`Making all post titles UPPERCASE...`))


var cursor = null

const paginatePosts = start => {
  start.get()
  .then(snap => {

    cursor = snap

    // Bluebird Promises lets you limit promises running at once:
    // http://bluebirdjs.com/docs/api/promise.map.html
    return Promise.map(snap.docs, updatePost, {concurrency: 4})
  })
  .then( () => {

    if (cursor == null || cursor.docs.length === 0) {
      console.log(chalk.green(`✅ done!`))
      return
    }

    var lastVisible = cursor.docs[cursor.docs.length-1];

    var next = db.collection('posts').orderBy('title').startAfter(lastVisible).limit(4);

    paginateCompany(next)

  })
  .catch(error => {
    console.log(chalk.red(`⚠️ migration error: `), error)
})
}

const updatePost = doc => {
  console.log(`  migrating post ${doc.id}...`)
  return db.collection('posts')
    .doc(doc.id)
    .update({
      title: doc.data().title.toUpperCase(),
    })
}

// Use cursors to paginate over db
// https://firebase.google.com/docs/firestore/query-data/query-cursors

var first = db.collection('posts').orderBy('title').limit(4);

paginatePosts(first);

console.log(chalk.blue(` ...iterating`))
