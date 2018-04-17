const admin = require('firebase-admin')
const FieldValue = require('firebase-admin').firestore.FieldValue
const functions = require('firebase-functions')
const stripe = require('stripe')(functions.config().stripe.secret_key)

// https://stripe.com/docs/billing/quickstart
exports.updateStripeSubscription = (change, context) => {

  const subscription = change.after.data()

  // helper functions should be inside parent to get scope for uid, etc

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

  const updateStripePaymentMethod = stripe_customer_id => {
    console.log(`
      updating payment method for
      cust ${stripe_customer_id}
      to
      ${subscription.temp_stripe_payment_token_id}
    `)
    return stripe.customers.update(stripe_customer_id, {
      source: subscription.temp_stripe_payment_token_id,
    })
  }

  const saveStripeSubscriptionToDatabase = stripe_subscription => {
    return change.after.ref.update({
      stripe_subscription_id: stripe_subscription.id,
      stripe_subscription_status: stripe_subscription.status,
    })
  }

  const removeTempPaymentMethod = () => {
    return change.after.ref.update({
      // we don't need this anymore, it's on the customer obj now
      temp_stripe_payment_token_id: FieldValue.delete(),
    })
  }

  const handleSubscriptionError = error => {
    console.error("...couldn't update stripe subscription", error)
    return change.after.ref.update({
      stripe_subscription_error: error.message,
    })
  }


  // Subscription has been deleted
  if (!change.after.exists) {
    return stripe.subscriptions.del(change.before.data().stripe_subscription_id)
  }

  // Updating an existing subscription
  if (subscription.stripe_subscription_id) {
    return getStripeCustomerIdForUser(subscription.user)
      .then(updateStripePaymentMethod)
      .then(removeTempPaymentMethod)
      .catch(handleSubscriptionError)
  }

  // Create a new stripe subscription
  return getStripeCustomerIdForUser(subscription.user)
    .then(createStripeSubscription)
    .then(saveStripeSubscriptionToDatabase)
    .then(removeTempPaymentMethod)
    .catch(handleSubscriptionError)

}
