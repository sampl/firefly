// *****************************************************************************
// Lets the developer turn off all user's acccess to the app until they upgrade
//
// Trigger the killswitch by adding this to the root of the database:
// { "_minimum_allowable_app_version": 2 }
// Where "2" is greater than APP_VERSION below
// *****************************************************************************

import React from 'react'
import Firebase from 'firebase'

// SET APP VERSION HERE
var APP_VERSION = 1

class KillSwitch extends React.Component {

  constructor(props) {
    super(props)
    this._get = this._get.bind(this)
    this.ref = Firebase.database().ref('_minimum_allowable_app_version')
    this.state = {
      minimumAllowableAppVersion: {}
    }
  }

  componentWillMount() {
    this._isMounted = true
    this._get()
    this.ref.on('value', this._get)
  }

  componentWillUnmount() {
    this._isMounted = false
    this.ref.off('value', this._get)
  }

  _get() {
    this.ref.once('value').then( (snap) => {
      if (this._isMounted) {
        this.setState({
          minimumAllowableAppVersion: snap.val()
        })
      }
    })
  }

  render() {
    if (APP_VERSION < this.state.minimumAllowableAppVersion) {
      // TODO - better message
      return (
        <div>
          <h1>Time for something new!</h1>
          <p>You're using an older version of this website. Please refresh the page to see the latest and greatest!</p>
        </div>
      )
    } else {
      return( <div> {this.props.children} </div> )
    }
  }

}

export default KillSwitch
