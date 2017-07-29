var admin = require("firebase-admin")

var serviceAccountDev = require("../config/service-account-key-dev.json")
var serviceAccountProd = require("../config/service-account-key-prod.json")

var firebaseConfigDev = require("../config/firebase-config-dev.json")
var firebaseConfigProd = require("../config/firebase-config-prod.json")

var posts = require("./data/sample_posts.json")

// use on production server with `node test.js prod`, otherwise falls back to dev
// https://firebase.google.com/docs/database/admin/start
if (process.argv[2] == 'prod') {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountProd),
    databaseURL: firebaseConfigProd.databaseURL,
  })
} else {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountDev),
    databaseURL: firebaseConfigDev.databaseURL,
  })
}

var database_ref = admin.database().ref('/post')

posts.forEach(function(post) {
  var key = database_ref.push().key
  database_ref.child(key).update(post, function(err) {
    if (err) {
      console.error('something went wrong: ', err)
    } else {
      console.log('created post '+key)
    }
  })
})
