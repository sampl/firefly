const admin = require('firebase-admin')
const FieldValue = require('firebase-admin').firestore.FieldValue
const functions = require('firebase-functions')
const stripe = require('stripe')(functions.config().stripe.secret_key)

// https://stripe.com/docs/billing/quickstart
exports.updateStripeSubscription = (change, context) => {

  const subscription = change.after.data()

  // Subscription has been deleted
  if (!change.after.exists) {
    return stripe.subscriptions.del(change.before.data().stripe_subscription_id)
  }

  // Subscription already has a stripe subscription
  // TODO - update stripe subscription with new details (ie new email)?
  if (subscription.stripe_subscription_id) {
    return null
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // helper functions should be inside parent to get scope for uid, etc
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  const getStripeCustomerIdForUser = userId => {
    return admin.firestore().collection('users').doc(userId).get().then( doc => {
      const stripe_customer_id = doc.data().stripe_customer_id
      if (!stripe_customer_id) {
        throw new Error('customer has no stripe_customer_id')
      }
      return stripe_customer_id
    })
  }

  const createStripeSubscription = stripe_customer_id => {
    return stripe.subscriptions.create({
      customer: stripe_customer_id,
      items: [{plan: functions.config().stripe.plan_id}],
      source: subscription.temp_stripe_payment_token_id,
    })
  }

  const saveStripeSubscriptionToDatabase = stripe_subscription => {
    change.after.ref.update({
      temp_stripe_payment_token_id: FieldValue.delete(), // we don't need this anymore, it's on the customer obj now
      stripe_subscription_id: stripe_subscription.id,
      stripe_subscription_status: stripe_subscription.status,
    })
  }

  // Create a new stripe subscription
  return getStripeCustomerIdForUser(subscription.user)
    .then(createStripeSubscription)
    .then(saveStripeSubscriptionToDatabase)
    .catch(error => {
      console.error("...couldn't subscribe this user", error)
      return change.after.ref.update({
        stripe_subscription_error: error.message,
      })
    })

}
