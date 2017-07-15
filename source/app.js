// HTML
// tells webpack to copy /source/index.html into the /build folder
// otherwise, index.html would have to live in /build, and we'd commit /build
import 'file-loader?name=[name].[ext]!./index.html'

// CSS
import 'normalize.css' // css reset
import './main.css'    // our app's css

import db from './db'

import React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter,
  Route
} from 'react-router-dom'

// components
import App from './components/_layout/App'

window.production = window.location.hostname == 'myapp.com' ? true : false

// render App to the DOM
// use Route to give the App props for location and history
ReactDOM.render( <BrowserRouter><Route component={App}/></BrowserRouter>, document.getElementById('root'))
