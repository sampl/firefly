import React from 'react'

import User from '../../models/User'

class LoggedOutOnly extends React.Component {

  constructor(props) {
    super(props)
    this._get = this._get.bind(this)
    this.state = {
      loggedOut: false
    }
  }

  componentWillMount() {
    this._get()
    User.on('change', this._get)
  }

  componentWillUnmount() {
    User.removeListener('change', this._get)
  }

  _get() {
    this.setState({
      loggedOut: !User.isLoggedIn() ? true : false
    })
  }

  render() {
    if (this.state.loggedOut) {
      return( <span>{this.props.children}</span> )
    } else {
      return( <span></span> )
    }
  }

}

export default LoggedOutOnly
