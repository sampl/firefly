const admin = require('firebase-admin')
const chalk = require('chalk')

const postData = require("./data/fake-posts.json")

// init firebase
const serviceAccount = require('./serviceAccountKey.dev.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = require('firebase-admin').firestore()

// add fake posts
console.log(chalk.blue(`Adding fake post data...`))
postData.map( post => db.collection('posts').add(post) )
console.log(chalk.green(`...added fake posts`))
