let Firebase = require('firebase')
let Moment = require('moment')
let EventEmitter = require('eventemitter3')

/*
  Helper object to keep Firebase stuff DRY
   - all items that come back from a query have "key" attributes
   - adds timestamps and saves which user created/updated
   - fire change events to the model for views to listen to
*/

let Supermodel = Object.create(new EventEmitter())

Supermodel.init = function({name, location}) {
  this.name = name
  this.ref = Firebase.database().ref(location)
}

// GETTERS

Supermodel.get = function(item_key) {
  return this.ref.child(item_key).once('value').then(function(snap) {
    let item = snap.val()
    if (!item) {
      throw new Error(`Couldn't find ${this.name} ${item_key}`)
    } else {
      item.key = item_key
      return item
    }
  }.bind(this))
}

Supermodel.getAllWithAttrValue = function(attrName, attrValue) {
  return this.ref.orderByChild(attrName).equalTo(attrValue).once('value').then(function(snap) {
    let items = []
    snap.forEach(function(childSnap) {
      let item = childSnap.val()
      item.key = childSnap.key
      items.push(item)
    })
    return items
  })
}

Supermodel.getAll = function() {
  return this.ref.once('value').then(function(snap) {
    let items = []
    snap.forEach(function(childSnap) {
      let item = childSnap.val()
      item.key = childSnap.key
      items.push(item)
    })
    return items
  })
}

// SETTERS

Supermodel.create = function(item_data) {

  item_data.created_by = Firebase.auth().currentUser ? Firebase.auth().currentUser.uid : null
  item_data.created_on = Moment().format()

  let new_key = this.ref.push().key
  return this.ref.child(new_key).update(item_data).then(function() {
    this.emit('change')
    return new_key
  }.bind(this))

}

Supermodel.update = function(item_key, new_data) {

  new_data.updated_by = Firebase.auth().currentUser ? Firebase.auth().currentUser.uid : null
  new_data.updated_on = Moment().format()

  // ensure we're not trying to write the key as part of the document
  delete new_data.key

  // ensure we're not writing derived attrs (attrs that start with "_")
  Object.keys(new_data).forEach( (key) => {
    if (key.indexOf('_') == 0) {
      delete new_data[key]
    }
  })

  return this.ref.child(item_key).update(new_data).then(function() {
    this.emit('change')
    return item_key
  }.bind(this))

}

Supermodel.destroy = function(item_key) {
  this.emit('change')
  return this.ref.child(item_key).remove()
}

export default Supermodel

// debugging
window.Supermodel = Supermodel
