import Firebase from 'firebase'
import ReactGA from 'react-ga'

import { prepareDocForCreate } from './helpers/firestore_helpers'

const createSubscription = token => {

  ReactGA.event({
    category: 'Subscription',
    action: 'Create subscription',
  })

  const subscription = prepareDocForCreate({
    user: Firebase.auth().currentUser.uid,
    temp_stripe_payment_token_id: token.id,
  })
  return Firebase.firestore()
    .collection('subscriptions')
    .add(prepareDocForCreate(subscription))
    .catch( error => {
      alert(`Whoops, couldn't create the subscription: ${error.message}`)
    })
}

export default createSubscription
