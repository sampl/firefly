import React from 'react'
import { Link } from 'react-router-dom'

import Routes from '../../Routes'
import Search from './components/Search'
import Account from './components/Account'

class Main extends React.Component {

  render() {
    return (
      <div>

        <div style={styles.header}>
          <Link to='/'>Firefly</Link>
          <Search />
          <Account />
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
    padding: '1rem 0',
    margin: '2rem 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  footer: {
    borderTop: '1px solid #eee',
    padding: '1rem 0',
    margin: '2rem 0',
    textAlign: 'center',
  },
}

export default Main
