import React from 'react'
import { Link } from 'react-router-dom'

import Routes from './Routes'
import Search from './components/Search'
import Account from './components/Account'

class Main extends React.Component {

  render() {
    return (
      <div>

        <div style={styles.header}>
          <Account />
          <Link to='/'>Firefly</Link>
          {' '}
          <Search />
        </div>

        <Routes location={this.props.location} />

        <div style={styles.footer} >
          <p> &copy; 2017 </p>
        </div>

      </div>
    )
  }
}

let styles = {
  header: {
    borderBottom: '1px solid #eee',
    padding: '0 0 1rem',
    margin: '0 0 2rem',
  },
  footer: {
    textAlign: 'center',
  },
}

export default Main
