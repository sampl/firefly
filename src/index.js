import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// eslint-disable-next-line
import db from './db'
import App from './views/_layout/App'
import 'normalize.css' // css reset
import './main.css'    // our app's css

console.log('env: '+process.env.NODE_ENV)

// render App to the DOM
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
