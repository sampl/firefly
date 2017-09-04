import React from 'react'
import { Link } from 'react-router-dom'

import Auth from '../../../models/Auth'

class Account extends React.Component {

  constructor(props) {
    super(props)
    this._get = this._get.bind(this)
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    this._get()
    Auth.on('change', this._get)
  }

  _get() {
    this.setState({
      user: Auth.getLoggedInUser()
    })
  }

  render() {
    if (this.state.user) {
      return (
        <Link to={{
            pathname: `/me`,
            state: { modal: true }
          }}>
          <img style={{width: '24px', height: '24px', borderRadius: '50%'}} src={this.state.user.photoURL} alt="you" />
        </Link>
      )
    } else {
      return (
        <Link to={{
            pathname: `/login`,
            state: { modal: true }
          }}>
          login
        </Link>
      )
    }
  }
}

export default Account
