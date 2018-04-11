import React from 'react'

import createSubscription from '../../actions/createSubscription'
import UserSubscriptionProvider from '../../data/UserSubscriptionProvider'

class Subscription extends React.Component {

  componentDidMount() {
    // https://stripe.com/docs/checkout
    this._handler = window.StripeCheckout.configure({
      key: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
      locale: 'auto',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      name: 'Firefly',
      description: 'Subscribe to Firefly',
      email: this.props.auth.email,
      allowRememberMe: false,
      amount: 39 * 100, // in cents
      token: token => createSubscription(token),
    })
  }

  _openPaymentWindow = () => {
    this._handler.open()
  }

  componentWillUnmount() {
    this._handler.close()
  }

  render() {
    return <UserSubscriptionProvider render={ ({loading, subscription, error}) => {
      if (loading) {
        return 'Loading subscription...'
      }

      if (error) {
        return 'Sorry, there was an error getting your subscription. Try refreshing the page?'
      }

      if (subscription) {
        return <div>
          'You are subscribed!'
          { subscription.stripe_subscription_error && <span style={{color: 'red'}}>stripe sub error</span>}
          {/* subscription details go here */}
        </div>
      }

      return <div>
        'You are not subscribed'
        <button onClick={this._openPaymentWindow}>Subscribe now</button>
      </div>
    }} />
  }
}

export default Subscription
