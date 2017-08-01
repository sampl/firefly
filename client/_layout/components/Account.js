import React from 'react'
import { Link } from 'react-router-dom'

import User from '../../../models/User'

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
    User.on('change', this._get)
  }

  _get() {
    this.setState({
      user: User.getLoggedInUser()
    })
  }

  render() {
    if (this.state.user) {
      return (
        <div style={styles.account}>
          <Link to='/me'>
            <img style={{width: '24px', height: '24px', borderRadius: '50%'}} src={this.state.user.photoURL} />
          </Link>
        </div>
      )
    } else {
      return (
        <div style={styles.account}>
          <Link to={{
              pathname: `/login`,
              state: { modal: true }
            }}>
            login
          </Link>
        </div>
      )
    }
  }
}

let styles = {
  account: {
    float: 'right',
  },
}

export default Account
