import Firebase from 'firebase/app'
import ReactGA from 'react-ga'
import { prepareDocForUpdate } from './helpers/firestoreHelpers'

const updateSubscription = (subscriptionId, token) => {

  ReactGA.event({
    category: 'Subscription',
    action: 'Update Subscription',
  })

  const subscription = prepareDocForUpdate({
    tempStripePaymentTokenId: token.id,
  })

  return Firebase.firestore()
    .collection('subscriptions')
    .doc(subscriptionId)
    .update(subscription)
    .catch( error => {
      alert(`Whoops, couldn't edit the subscription: ${error.message}`)
    })
}

export default updateSubscription
