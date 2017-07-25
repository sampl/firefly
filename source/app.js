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
import ScrollToTop from './components/_util/ScrollToTop'

if (PRODUCTION) {
  console.log('env: production/live')
} else {
  console.log('env: stage/dev')
}

// render App to the DOM
// use Route to give the App props for location and history
ReactDOM.render(
    <BrowserRouter>
      <ScrollToTop>
        <Route component={App}/>
      </ScrollToTop>
    </BrowserRouter>
, document.getElementById('root'))
