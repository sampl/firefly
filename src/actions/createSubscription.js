import Firebase from 'firebase/app'
import ReactGA from 'react-ga'

import { prepareDocForCreate } from './helpers/firestoreHelpers'

const createSubscription = token => {

  ReactGA.event({
    category: 'Subscription',
    action: 'Create subscription',
  })

  const subscription = prepareDocForCreate({
    user: Firebase.auth().currentUser.uid,
    tempStripePaymentTokenId: token.id,
  })
  return Firebase.firestore()
    .collection('subscriptions')
    .add(prepareDocForCreate(subscription))
    .catch( error => {
      alert(`Whoops, couldn't create the subscription: ${error.message}`)
    })
}

export default createSubscription
