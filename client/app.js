import React from 'react'
import ReactDOM from 'react-dom'

import db from './db'
import App from './_layout/App'
import 'normalize.css' // css reset
import './main.css'    // our app's css

if (PRODUCTION) {
  console.log('env: production/live')
} else {
  console.log('env: stage/dev')
}

// render App to the DOM
ReactDOM.render(<App />, document.getElementById('root'))
