/*
 *   Helper functions for working with Firebase Firestore
 */

const Firebase = require('firebase')

// GETTERS

const getOneFromDocumentSnapshot = snapshot => {
  if (!snapshot.exists) {
    return null
  }
  let doc = snapshot.data()
  doc.id = snapshot.id
  return doc
}

const getOneFromQuerySnapshot = snapshot => {
  if (snapshot.empty) {
    return null
  }
  let doc = snapshot.docs[0].data()
  doc.id = snapshot.docs[0].id
  return doc
}

const getManyFromQuerySnapshot = snapshot => {
  return snapshot.docs.map( snap => {
    const doc = snap.data()
    doc.id = snap.id
    return doc
  })
}

// SETTERS
// adds timestamps and saves which user created/updated

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
  getOneFromDocumentSnapshot,
  getOneFromQuerySnapshot,
  getManyFromQuerySnapshot,
  prepareDocForCreate,
  prepareDocForUpdate,
}
