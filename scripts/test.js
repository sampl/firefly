var admin = require("firebase-admin")
var serviceAccount = require("../service-account-key.json")
var firebaseConfig = require("../firebase-config-stage.json")

// https://firebase.google.com/docs/database/admin/start
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
})

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
