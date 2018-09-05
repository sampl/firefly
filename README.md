A modern web-app boilerplate with Create React App and Firebase. Focused on simplicity for new devs, rapid prototyping, and smallish projects.

### **Full documentation at [getfirefly.org](http://getfirefly.org)**

### **[Live Demo](https://demo.getfirefly.org)**

## App Structure

This root directory contains configuration files for Firebase, NPM, and git (The `package.json` scripts pull the environment variables from an `.env` file before calling react-scripts. Learn how it works [here](https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d))

Child folders each have their own readme:

- [`/functions`](https://github.com/sampl/firefly/tree/master/functions) - contains a little backend code for updating our search index when a post changes, keeping subscriptions in sync with stripe, and some denormalization of posts.
- [`/public`](https://github.com/sampl/firefly/tree/master/public) - files that will be available as-is when you go live
- [`/scripts`](https://github.com/sampl/firefly/tree/master/scripts) - scripts you can run manually on the database. Useful for adding dummy data, "migrations", etc.
- [`/src`](https://github.com/sampl/firefly/tree/master/src) - contains most of the app. These are create components that are compiled into a single JS file and sent to the user's browser.

## License

[MIT License](https://en.wikipedia.org/wiki/MIT_License)
