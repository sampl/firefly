import React from 'react'
import { Link } from 'react-router'

import UsersModel from '../../models/User'

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this._get = this._get.bind(this)
    this._logOut = this._logOut.bind(this)
    this.state = {
      user: {}
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
    UsersModel.getCurrentUser(function(err, user){
      this.setState({
        user,
      })
    }.bind(this))
  }

  _logOut() {
    UsersModel.logOut()
    this.props.history.push('/')
  }

  render() {
    if (this.state.user) {
      return(
        <div>
          <img style={{maxWidth: '100px', maxHeight: '100px'}} src={this.state.user.photoURL} />
          <h2>Your Profile</h2>
          <p>Name: {this.state.user.displayName}</p>
          <p>Email: {this.state.user.email}</p>
          <button onClick={this._logOut}>log out</button>
        </div>
      )
    } else {
      return(<div>not logged in</div>)
    }
  }
}

export default Profile
