// tells webpack to copy /source/index.html into the /build folder
// otherwise, index.html would have to live in /build, and we'd commit /build
import 'file-loader?name=[name].[ext]!./index.html'

// import css
import 'normalize.css' // use a CSS reset - https://necolas.github.io/normalize.css/
import './main.css'    // our app's CSS

console.log('hallo werld')
