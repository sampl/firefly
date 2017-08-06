import React from 'react'
import { Link } from 'react-router'

import User from '../../models/User'
import AdminOnly from '../_util/AdminOnly'
import Loading from '../_util/Loading'

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this._get = this._get.bind(this)
    this._logOut = this._logOut.bind(this)
    this.state = {
      loading: true,
      user: null,
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
      loading: false,
      user: User.getLoggedInUser(),
    })
  }

  _logOut() {
    User.logOut()
    this.props.history.push('/')
  }

  render() {
    if (this.state.loading) {
      return(<Loading />)
    }
    if (this.state.error) {
      return(<Error message="couldn't find that profile" />)
    }
    if (this.state.user) {
      return(
        <div>
          <img style={styles.image} src={this.state.user.photoURL} />
          <h2>Your Profile</h2>
          <p>Name: {this.state.user.displayName}</p>
          <p>Email: {this.state.user.email}</p>
          <AdminOnly>
            <p>⭐️ is an admin</p>
          </AdminOnly>
          <button onClick={this._logOut}>log out</button>
        </div>
      )
    } else {
      return(<div>not logged in</div>)
    }
  }
}

let styles = {
  image: {
    maxWidth: '100px',
    maxHeight: '100px',
    borderRadius: '50%',
  }
}

export default Profile
