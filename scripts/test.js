var admin = require("firebase-admin")

var serviceAccountDev = require("../config/service-account-key-dev.json")
var serviceAccountProd = require("../config/service-account-key-prod.json")

var firebaseConfigDev = require("../config/firebase-config-dev.json")
var firebaseConfigProd = require("../config/firebase-config-prod.json")

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

var db = admin.database()
var ref = db.ref('/post')

var testPost = {
  title: 'Created from Script',
  content: 'This post was created by running a test script locally'
}

var key = ref.push().key
ref.child(key).update(testPost, function(err) {
  if (err) {
    console.error('something went wrong: ', err)
  } else {
    console.log('created post '+key)
  }
})
