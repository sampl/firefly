import React from 'react'

import Auth from '../../models/Auth'
import AdminOnly from '../_util/AdminOnly'
import Loading from '../Loading'
import Error from '../Error'

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
    Auth.on('change', this._get)
  }

  componentWillUnmount() {
    Auth.removeListener('change', this._get)
  }

  _get() {
    this.setState({
      loading: false,
      user: Auth.getLoggedInUser(),
    })
  }

  _logOut() {
    Auth.logOut()
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
          <img style={styles.image} src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <h2>Your Profile</h2>
          <p>Name: {this.state.user.displayName}</p>
          <p>Email: {this.state.user.email}</p>
          <AdminOnly>
            <p>is an admin</p>
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
