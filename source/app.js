// tells webpack to copy /source/index.html into the /build folder
// otherwise, index.html would have to live in /build, and we'd commit /build
import 'file-loader?name=[name].[ext]!./index.html'

// import css
import 'normalize.css' // use a CSS reset - https://necolas.github.io/normalize.css/
import './main.css'    // our app's CSS

// import React
// learn about react here: https://facebook.github.io/react/docs/hello-world.html
import React from 'react'
import ReactDOM from 'react-dom'

// import our Routes component
// this contains all our top-level components
import Routes from './Routes'

// tell react to render the Routes component to the #root div in index.html
ReactDOM.render(<Routes />, document.getElementById('root'))
