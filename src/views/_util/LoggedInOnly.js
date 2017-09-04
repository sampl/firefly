import React from 'react'

import Auth from '../../models/Auth'

class LoggedInOnly extends React.Component {

  constructor(props) {
    super(props)
    this._get = this._get.bind(this)
    this.state = {
      loggedIn: false
    }
  }

  componentWillMount() {
    this._get()
    Auth.on('change', this._get)
  }

  componentWillUnmount() {
    Auth.removeListener('change', this._get)
  }

  _get() {
    this.setState({
      loggedIn: Auth.getLoggedInUser() ? true : false
    })
  }

  render() {
    if (this.state.loggedIn) {
      return( <span>{this.props.children}</span> )
    } else {
      return( <span></span> )
    }
  }

}

export default LoggedInOnly
