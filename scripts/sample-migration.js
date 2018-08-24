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

// if you're collection is big, you might want to paginate the query
// so you don't download the entire thing at once:
// https://firebase.google.com/docs/firestore/query-data/query-cursors
// TODO - show an example?
db.collection('posts').get()
  .then(snap => {
    // Bluebird Promises lets you limit promises running at once:
    // http://bluebirdjs.com/docs/api/promise.map.html
    return Promise.map(snap.docs, updatePost, {concurrency: 5})
  })
  .then( () => {
    console.log(chalk.green(`✅ done!`))
  })
  .catch(error => {
    console.log(chalk.red(`⚠️ migration error: `), error)
  })

const updatePost = doc => {
  console.log(`  migrating post ${doc.id}...`)
  return db.collection('posts')
    .doc(doc.id)
    .update({
      title: doc.data().title.toUpperCase(),
    })
}
