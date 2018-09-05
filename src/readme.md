# Source

This folder contains almost all the source code for the front-end app (except a few files in `/public`).

## Subfolders

- [`/src/actions`](https://github.com/sampl/firefly/tree/master/src/actions) - plain old javascript functions for changing app data or state, like loging out or create a post (similar to MVC "controllers")
- [`/src/styles`](https://github.com/sampl/firefly/tree/master/src/styles) - style-only react components for use in your views (replaces your CSS/SASS files)
- [`/src/views`](https://github.com/sampl/firefly/tree/master/src/views) - react components that show your app's UI ("views" in MVC)

## Important files

- [`/src/index.js`](https://github.com/sampl/firefly/tree/master/src/index.js) - Create React App will use this file as a starting point for compiling your whole front-end app. All `index.js` does is set up Firebase, initialize tracking services like Google Analytics, and use React to render the main `<App>` component.
- [`/src/views/App.js`](https://github.com/sampl/firefly/tree/master/src/views/App.js) - The main React component of our app. `App.js` renders our page layout, some wrapper components for Firestore and React Router, and our `Routes.js` file.
- [`/src/views/Routes.js`](https://github.com/sampl/firefly/tree/master/src/views/Routes.js) - Contains all the routes in our app. Each route renders one of our app's main pages.