var Firebase = require('firebase')
var Moment = require('moment')

/*
  Helper superclass to keep Firebase stuff DRY
   - all items that come back from a query have "key" attributes
   - validates against a yup schema before saving/updating
   - adds timestamps and saves which user created/updated
*/

class Supermodel {

  constructor(name, location, schema) {
    this.name = name
    this.ref = Firebase.database().ref(location)
    this.schema = schema
  }

  // GETTERS

  get(item_key, callback) {
    this.ref.child(item_key).once('value').then(function(snap) {
      var item = snap.val()
      item.key = item_key
      callback(null, item)
    })
  }

  getByChildValue(child, value, callback) {
    this.ref.orderByChild(child).equalTo(value).once('value').then(function(snap) {
      var items = snap.val()
      var key = Object.keys(items)[0]
      var item = items[key]
      item.key = key
      callback(null, item)
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
    })
  }

  // SETTERS

  create(item, callback) {

    this.isValid(item, function(valid) {
      if (!valid) {
        callback({message: this.name+' is not valid'}, null)
      } else {
        item.created_by = Firebase.auth().currentUser ? Firebase.auth().currentUser.uid : null
        item.created_on = Moment().format()

        var key = this.ref.push().key
        this.ref.child(key).update(item)

        callback(null, key)
      }
    }.bind(this))

  }

  update(item_key, new_data, callback) {

    this.isValid(item, function(valid) {
      if (!valid) {
        callback({message: this.name+' is not valid'}, null)
      } else {
        new_data.updated_by = Firebase.auth().currentUser ? Firebase.auth().currentUser.uid : null
        new_data.updated_on = Moment().format()

        this.ref.child(item_key).update(new_data)
        callback(null, this)
      }
    }.bind(this))

  }

  // VALIDATION

  isValid(item, callback) {
    this.schema.isValid(item).then(function(valid){
      callback(valid)
    })
  }

}

export default Supermodel
