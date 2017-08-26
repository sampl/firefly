import React from 'react'
import ReactDOM from 'react-dom'

// eslint-disable-next-line
import db from './db'
import App from './views/_layout/App'
import 'normalize.css' // css reset
import './main.css'    // our app's css

console.log('env: '+process.env.NODE_ENV)

// render App to the DOM
ReactDOM.render(<App />, document.getElementById('root'))
