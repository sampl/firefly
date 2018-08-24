const admin = require('firebase-admin')
const FieldValue = require('firebase-admin').firestore.FieldValue
const functions = require('firebase-functions')
const Stripe = require('stripe')

const STRIPE_SECRET_KEY = functions.config().stripe.secret_key
const STRIPE_PLAN_ID = functions.config().stripe.plan_id
const stripe = Stripe(STRIPE_SECRET_KEY)

// this backend code is responsible for keeping the Stripe subscriptions 
// up-to-date when users CRUD db subscriptions
// https://stripe.com/docs/billing/quickstart

// NOTE - this code DOES NOT update your database if a user's card fails
// when it's time to automate failed suscriptions, use
// https://stripe.com/docs/webhooks or a service like Charify or Recurly
exports.updateStripeSubscription = (change, context) => {
  
  // if subscription has been deleted
  if (!change.after.exists) {
    const oldSubscription = change.before.data()
    console.log(`deleted subscription ${change.before.id}; deleting ${oldSubscription.stripeSubscriptionId}`)
    return stripe.subscriptions.del(oldSubscription.stripeSubscriptionId)
  }
  
  const subscription = change.after.data()
  subscription.id = change.after.id

  // if subscription's payment is waiting to be sent to Stripe
  const tokenId = subscription.tempStripePaymentTokenId
  if (tokenId) {
    console.log(`update subscription ${subscription.id} with ${tokenId}`)
    return getStripeCustomerIdForUser(subscription.user)
      .then(customerId => updateStripeCustomerPaymentMethod(customerId, tokenId) )
      .then(stripeCustomer => createOrGetStripeSubscription(stripeCustomer.id, subscription.stripeSubscriptionId))
      .then(stripeSubscription => saveSubscriptionToDatabase(subscription.id, stripeSubscription))
      .catch(error => {
        console.error("couldn't update stripe subscription", error)
        return change.after.ref.update({
          stripeSubscriptionError: error.message,
          tempStripePaymentTokenId: FieldValue.delete(),
        })
      })
  }

  // otherwise, no changes needed
  return null
}

const createOrGetStripeSubscription = (stripeCustomerId, subscriptionId) => {
  if (subscriptionId) {
    return getStripeSubscription(subscriptionId)
  } else {
    return createStripeSubscription(stripeCustomerId)
  }
}


// Database helpers

const getStripeCustomerIdForUser = userId => {
  return admin.firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then( doc => {
      const stripeCustomerId = doc.data().stripeCustomerId
      if (!stripeCustomerId) {
        throw new Error(`user ${userId} has no stripeCustomerId`)
      }
      return stripeCustomerId
    })
}

const saveSubscriptionToDatabase = (subscriptionId, stripeSubscription) => {
  return admin.firestore()
    .collection('subscriptions')
    .doc(subscriptionId)
    .update({
      stripeSubscriptionId: stripeSubscription.id,
      stripeSubscriptionStatus: stripeSubscription.status,
      tempStripePaymentTokenId: FieldValue.delete(),
    })
}


// Stripe API calls

// https://stripe.com/docs/api#update_customer-source
const updateStripeCustomerPaymentMethod = (stripeCustomerId, tokenId) => {
  return stripe.customers.update(stripeCustomerId, {
    source: tokenId,
  })
}

// https://stripe.com/docs/api#create_subscription-items-plan
const createStripeSubscription = stripeCustomerId => {
  return stripe.subscriptions.create({
    customer: stripeCustomerId,
    items: [{plan: STRIPE_PLAN_ID}],
  })
}

// https://stripe.com/docs/api#retrieve_subscription
const getStripeSubscription = stripeSubscriptionId => {
  return stripe.subscriptions.retrieve(stripeSubscriptionId)
}
