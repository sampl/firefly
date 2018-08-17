/*
 *   Helper functions for working with Firebase Firestore
 */

const Firebase = require('firebase')

const prepareDocForCreate = doc => {

  // timestamps
  doc.createdBy = Firebase.auth().currentUser ? Firebase.auth().currentUser.uid : null
  doc.createdOn = new Date()

  return doc
}

const prepareDocForUpdate = doc => {

  // timestamps
  doc.updatedBy = Firebase.auth().currentUser ? Firebase.auth().currentUser.uid : null
  doc.updatedOn = new Date()

  // ensure we're not trying to write the key as part of the document
  delete doc.id

  // ensure we're not writing derived attrs (attrs that start with "_")
  Object.keys(doc).forEach( key => {
    if (key.indexOf('_') === 0) {
      delete doc[key]
    }
  })

  return doc
}

export {
  prepareDocForCreate,
  prepareDocForUpdate,
}
