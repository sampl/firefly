import React from 'react'

import UsersModel from '../../models/User'

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
    UsersModel.on('change', this._get)
  }

  componentWillUnmount() {
    UsersModel.removeListener('change', this._get)
  }

  _get() {
    this.setState({
      loggedIn: UsersModel.loggedIn() ? true : false
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
