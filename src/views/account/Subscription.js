import React from 'react'

import createSubscription from '../../actions/createSubscription'
import deleteSubscription from '../../actions/deleteSubscription'
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

  openPaymentWindow = () => {
    this._handler.open()
  }

  componentWillUnmount() {
    this._handler.close()
  }

  render() {
    return <UserSubscriptionProvider auth={this.props.auth}>
      { subscription => {

        if (subscription && subscription.temp_stripe_payment_token_id) {
          return 'Subscribing you to the paid plan...'
        }

        if (subscription && subscription.stripe_subscription_error) {
          return <span style={{color: 'red'}}>Whoops&mdash;there was an error creating your subscription. Sorry about that!</span>
        }

        if (subscription) {
          return <div>
            You are subscribed!
            <br/>
            Status: {subscription.stripe_subscription_status}
            <br/>
            <button onClick={() => {
              if (window.confirm(`Are you sure you want to cancel your subscription? You won't have access to paid Firefly features.`)) {
                deleteSubscription(subscription)
              }
            }}>Cancel subscription</button>
          </div>
        }

        return <div>
          Subscribe now to get paid features
          <br/>
          <button onClick={this.openPaymentWindow}>Subscribe now</button>
        </div>
      }}
    </UserSubscriptionProvider>
  }
}

export default Subscription
