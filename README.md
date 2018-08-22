A modern web-app boilerplate with Create React App and Firebase. Focused on simplicity for new devs, rapid prototyping, and smallish projects.

### **Full documentation at [getfirefly.org](https://getfirefly.org)**

### **[Live Demo](https://demo.getfirefly.org)**


## App Structure

- [`/`](https://github.com/sampl/firefly/tree/master) - The root directory just contains configuration files for Firebase, NPM, and git (The `package.json` scripts pull the environment variables from an `.env` file
before calling react-scripts. Learn how it works [here](https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d))
- [`/functions`](https://github.com/sampl/firefly/tree/master/functions) - contains a little backend code for updating our search index when a post changes, keeping subscriptions in sync with stripe, and some denormalization of posts.
- [`/public`](https://github.com/sampl/firefly/tree/master/public) - files that will be available as-is when you go live
- [`/scripts`](https://github.com/sampl/firefly/tree/master/scripts) - scripts you can run manually on the database. Useful for adding dummy data, "migrations", etc.
- [`/src`](https://github.com/sampl/firefly/tree/master/src) - contains most of the app. These are create components that are compiled into a single JS file and sent to the user's browser.
- [`/src/actions`](https://github.com/sampl/firefly/tree/master/src/actions) - plain old javascript functions for changing app data or state, like loging out or create a post (similar to MVC "controllers")
- [`/src/styles`](https://github.com/sampl/firefly/tree/master/src/styles) - style-only react components for use in your views (replaces your CSS/SASS files)
- [`/src/views`](https://github.com/sampl/firefly/tree/master/src/views) - react components that show your app's UI ("views" in MVC)


## License

MIT License

Copyright (c) 2018 Samuel Pierce Lolla

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
