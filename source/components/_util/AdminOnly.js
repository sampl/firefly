// ****************************************************************************
// NOTE: This does NOT prevent malicious users from seeing the UI, but you can
//       (and should!) use Firebase rules to prevent them from changing data
// ****************************************************************************

import React from 'react'

import User from '../../models/User'

class AdminOnly extends React.Component {

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

  componentWillUnmount() {
    User.removeListener('change', this._get)
  }

  _get() {
    User.getAdminStatus(function(status){
      this.setState({
        admin: status
      })
    }.bind(this)).catch(function(err){
      console.error("Whoops, couldn't get the user's admin status: "+err.message)
    }.bind(this))
  }

  render() {
    if (this.state.admin) {
      return( <span>{this.props.children}</span> )
    } else {
      return( <span></span> )
    }
  }

}

export default AdminOnly
