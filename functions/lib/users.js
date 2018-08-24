const admin = require('firebase-admin')
const functions = require('firebase-functions')
const stripe = require('stripe')(functions.config().stripe.secret_key)

exports.createUser = user => {
  return createStripeCustomer(user.email)
    .then(customer => saveStripeCustomerToDatabase(customer.id, user.uid))
    .catch(error => {
      console.error("couldn't create a user and stripe customer", error)
    })
}

const createStripeCustomer = email => {
  return stripe.customers.create({
    email,
  })
}

const saveStripeCustomerToDatabase = (customerId, userId) => {
  return admin.firestore()
    .collection('users')
    .doc(userId).set({
      stripe_customer_id: customerId,
    })
}
