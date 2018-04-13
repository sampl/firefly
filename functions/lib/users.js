const admin = require('firebase-admin')
const functions = require('firebase-functions')
const stripe = require('stripe')(functions.config().stripe.secret_key)

exports.createUser = user => {

  const createStripeCustomer = email => {
    return stripe.customers.create({
      email,
    })
  }

  const saveStripeCustomerToDatabase = stripe_customer => {
    return admin.firestore().collection('users').doc(user.uid).set({
      stripe_customer_id: stripe_customer.id,
    })
  }

  return createStripeCustomer(user.email)
    .then(saveStripeCustomerToDatabase)
    .catch(error => {
      console.error("couldn't create a user and stripe customer", error)
    })

}
