import React from 'react'

import Routes from './Routes'

// TODO - close with escape key

class Modal extends React.Component {
  render() {
    return(
      <div style={styles.wrapper}>
        <div style={styles.popup}>
          <div style={styles.closeX} onClick={this.props.goBack}>&times;</div>
          <Routes />
        </div>
        <div style={styles.overlay} onClick={this.props.goBack}></div>
      </div>
    )
  }
}

let styles = {
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    zIndex: 1,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    background: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    position: 'relative',
    zIndex: 3,
    background: 'white',
    width: '400px',
    margin: '2rem auto',
    padding: '2rem',
  },
  closeX: {
    fontSize: '2rem',
    fontWeight: '300',
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    cursor: 'pointer',
  },
}

export default Modal
