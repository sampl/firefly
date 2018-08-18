import Firebase from 'firebase'
import ReactGA from 'react-ga'
import { prepareDocForUpdate } from './helpers/firestore_helpers'

const updateSubscription = (subscriptionId, token) => {

  ReactGA.event({
    category: 'Subscription',
    action: 'Update Subscription',
  })

  const subscription = prepareDocForUpdate({
    temp_stripe_payment_token_id: token.id,
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
