import React from 'react'

import Auth from '../../models/Auth'

class LoggedOutOnly extends React.Component {

  constructor(props) {
    super(props)
    this._get = this._get.bind(this)
    this.state = {
      loggedOut: false
    }
  }

  componentWillMount() {
    this._isMounted = true
    this._get()
    Auth.on('change', this._get)
  }

  componentWillUnmount() {
    this._isMounted = false
    Auth.removeListener('change', this._get)
  }

  _get() {
    if (this._isMounted) {
      this.setState({
        loggedOut: !Auth.getLoggedInUser() ? true : false
      })
    }
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
