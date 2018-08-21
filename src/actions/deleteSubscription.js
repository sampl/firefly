import Firebase from 'firebase/app'
import ReactGA from 'react-ga'

const deleteSubscription = subscription => {

  ReactGA.event({
    category: 'Subscription',
    action: 'Delete subscription',
  })

  return Firebase.firestore()
    .collection('subscriptions')
    .doc(subscription.id)
    .delete()
    .catch( error => {
      alert(`Whoops, couldn't delete the subscription: ${error.message}`)
    })
}

export default deleteSubscription
