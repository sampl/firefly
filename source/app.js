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

// components
import Routes from './Routes'

window.production = window.location.hostname == 'myapp.com' ? true : false

// tell react to render the Routes component to the #root div in index.html
ReactDOM.render(<Routes />, document.getElementById('root'))
