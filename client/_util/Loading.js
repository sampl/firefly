import React from 'react'

const Loading = () => (
  <div style={styles.loaderWrapper}>
    <div style={styles.loader}></div>
  </div>
)

let styles = {
  loaderWrapper: {
    position: 'relative',
    padding: '10rem 0',
  },
  loader: {
    height: '30px',
    width: '30px',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderColor: 'transparent hsl(220, 80%, 60%) hsl(220, 80%, 60%) hsl(220, 80%, 60%)',
    borderWidth: '2px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'rotation 1s linear infinite',
  }
}

export default Loading
