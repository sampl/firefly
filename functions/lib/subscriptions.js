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
  
  // if subscription has been deleted, delete any attached stripe subscription
  if (!change.after.exists) {
    console.log(`deleted subscription ${change.before.id}: ${change.before.data()}`)
    const stripeSubscriptionId = change.before.data().stripeSubscriptionId
    if (stripeSubscriptionId) {
      return stripe.subscriptions.del(stripeSubscriptionId)
    }
    return null
  }

  const subscription = change.after.data()
  subscription.id = change.after.id

  // only continue if the subscription has a payment token waiting to be sent to Stripe
  if (!subscription.tempStripePaymentTokenId) {
    return null
  }
  
  console.log(`update subscription ${subscription.id} with ${subscription.tempStripePaymentTokenId}`)
  return getUser(subscription.createdBy)
    .then(user => createOrGetStripeCustomerId(user))
    .then(stripeCustomerId => updateStripeCustomerPaymentMethod(stripeCustomerId, subscription.tempStripePaymentTokenId) )
    .then(stripeCustomer => createOrGetStripeSubscription(stripeCustomer.id, subscription.stripeSubscriptionId))
    .then(stripeSubscription => saveStripeSubscriptionToDatabase(subscription.id, stripeSubscription))
    .catch(error => {
      console.error(`couldn't update stripe subscription`, error)
      return change.after.ref.update({
        stripeSubscriptionError: error.message,
        tempStripePaymentTokenId: FieldValue.delete(),
      })
    })
}

const createOrGetStripeCustomerId = user => {
  if (user.stripeCustomerId) {
    return user.stripeCustomerId
  } else {
    return getUserEmail(user.id)
      .then(userEmail => createStripeCustomer(userEmail))
      .then(stripeCustomer => saveStripeCustomerAndReturnId(user, stripeCustomer))
  }
}
const saveStripeCustomerAndReturnId = (user, stripeCustomer) => {
  return saveStripeCustomerIdToDatabase(user.id, stripeCustomer.id)
    .then( () => stripeCustomer.id)
}

const createOrGetStripeSubscription = (stripeCustomerId, subscriptionId) => {
  if (subscriptionId) {
    return getStripeSubscription(subscriptionId)
  } else {
    return createStripeSubscription(stripeCustomerId)
  }
}


// Database helpers

const getUser = userId => {
  return admin.firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then(doc => {
      const user = {
        id: userId,
        ...doc.data(),
      }
      return user
    })
}

const getUserEmail = userId => {
  return admin.auth()
    .getUser(userId)
    .then(userRecord => userRecord.email)
}

const saveStripeCustomerIdToDatabase = (userId, stripeCustomerId) => {
  return admin.firestore()
    .collection('users')
    .doc(userId)
    .set({
      stripeCustomerId,
    })
}

const saveStripeSubscriptionToDatabase = (subscriptionId, stripeSubscription) => {
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

// https://stripe.com/docs/api#create_customer
const createStripeCustomer = email => {
  return stripe.customers.create({
    email,
  })
}

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
