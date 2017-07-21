import React from 'react'
import { Link } from 'react-router-dom'

import UsersModel from '../../models/User'
import Routes from './Routes'
import Search from './Search'

class Main extends React.Component {

  constructor(props) {
    super(props)
    this._get = this._get.bind(this)
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    this._get()
    UsersModel.on('change', this._get)
  }

  _get() {
    UsersModel.getCurrentUser(function(err, user){
      this.setState({
        user,
      })
    }.bind(this))
  }

  render() {
    if (this.state.user) {
      var account =
        <Link to='/me'>
          <img style={{width: '24px', height: '24px', borderRadius: '50%'}} src={this.state.user.photoURL} />
        </Link>
    } else {
      var account =
        <Link to={{
          pathname: `/login`,
          state: { modal: true }
        }}>
          login
        </Link>
    }

    return (
      <div>

        <div style={styles.header}>
          <Link to='/'>Firefly</Link>
          <Search />
          <div style={styles.account}>
            {account}
          </div>
        </div>

        <Routes location={this.props.location} />

        <div style={styles.footer} >
          <p> &copy; 2017 </p>
        </div>

      </div>
    )
  }
}

var styles = {
  header: {
    borderBottom: '1px solid #eee',
    padding: '0 0 1rem',
    margin: '0 0 2rem',
  },
  account: {
    float: 'right',
  },
  footer: {
    textAlign: 'center',
  },
}

export default Main
