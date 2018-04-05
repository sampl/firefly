**Making websites is still too hard.**

Building a static HTML/CSS site is pretty easy—but building log in, forms, and search is way harder. Most people who try to learn just give up.

Firefly is a modern web app boilerplate for junior devs who just want to make something cool. Firefly uses a lot of, but does without Redux and a lot of the complicated things that get in the way of shipping. Think of it as a tiny alternative to Rails for people learning JS.

I built Firefly for myself to help me with my own projects. I hope you use it to make something of your own.

### **Full documentation at [getfirefly.org](http://getfirefly.org)**

**[Live Demo](https://firefly-a64d8.firebaseapp.com/)**


## App Structure

- [`/functions`](https://github.com/sampl/firefly/tree/master/functions) - contains the little backend code necessary for the app (just one function to update our search index when a post chances).
- [`/public`](https://github.com/sampl/firefly/tree/master/public) - files that will be available as-is when you go live
- [`/scripts`](https://github.com/sampl/firefly/tree/master/scripts) - little javascript scripts you can manually run on your database. Useful for adding dummy data, "migrations", etc.
- [`/src`](https://github.com/sampl/firefly/tree/master/src) - contains most of the app. These are create components that are compiled into a single JS file and sent to the user's browser.
- [`/src/actions`](https://github.com/sampl/firefly/tree/master/src/actions) - plain old javascript functions that "do things" in your app like log out or create a post (similar to MVC "controllers")
- [`/src/data`](https://github.com/sampl/firefly/tree/master/src/data) - react components that get data from your Firebase database for your views (think "models" in MVC)
- [`/src/styles`](https://github.com/sampl/firefly/tree/master/src/styles) - low-level react components for use in your views (replaces your CSS/SASS files)
- [`/src/views`](https://github.com/sampl/firefly/tree/master/src/views) - mostly-stateless react components that show your app's UI ("views" in MVC)


## License

MIT License

Copyright (c) 2017 Samuel Pierce Lolla

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
