var Firebase = require('firebase')
var Moment = require('moment')
var EventEmitter = require('eventemitter3')

/*
  Helper superclass to keep Firebase stuff DRY
   - errors in callbacks
   - all items that come back from a query have "key" attributes
   - adds timestamps and saves which user created/updated
*/

class Supermodel extends EventEmitter {

  constructor(name, location) {
    super()
    this.name = name
    this.ref = Firebase.database().ref(location)
  }

  // GETTERS

  get(item_key, callback) {
    this.ref.child(item_key).once('value').then(function(snap) {
      var item = snap.val()
      if (!item) {
        callback(new Error(`Couldn't find ${this.name} ${item_key}`), null)
      } else {
        item.key = item_key
        callback(null, item)
      }
    }.bind(this)).catch(function(err){
      callback(err, null)
    })
  }

  getAllWithAttrValue(attrName, attrValue, callback) {
    this.ref.orderByChild(attrName).equalTo(attrValue).once('value').then(function(snap) {
      var items = []
      snap.forEach(function(childSnap) {
        var item = childSnap.val()
        item.key = childSnap.key
        items.push(item)
      })
      callback(null, items)
    }.bind(this)).catch(function(err){
      callback(err, null)
    })
  }

  getAll(callback) {
    this.ref.once('value').then(function(snap) {
      var items = []
      snap.forEach(function(childSnap) {
        var item = childSnap.val()
        item.key = childSnap.key
        items.push(item)
      })
      callback(null, items)
    }).catch(function(err){
      callback(err, null)
    })
  }

  // SETTERS

  create(item_data, callback) {

    item_data.created_by = Firebase.auth().currentUser ? Firebase.auth().currentUser.uid : null
    item_data.created_on = Moment().format()

    var key = this.ref.push().key
    this.ref.child(key).update(item_data, function(err) {
      if (!err) {
        this.emit('change')
        callback(null, key)
      }
    }.bind(this)).catch(function(err) {
      callback(err, null)
    })

  }

  update(item_key, new_data, callback) {

    new_data.updated_by = Firebase.auth().currentUser ? Firebase.auth().currentUser.uid : null
    new_data.updated_on = Moment().format()

    // ensure we're not trying to write the key as part of the document
    delete new_data.key

    this.ref.child(item_key).update(new_data, function(err) {
      if (!err) {
        this.emit('change')
        callback(null, item_key)
      }
    }.bind(this)).catch(function(err) {
      callback(err, null)
    })

  }

  destroy(item_key) {
    this.ref.child(item_key).remove()
    this.emit('change')
  }

}

export default Supermodel

// debugging
window.Supermodel = Supermodel
