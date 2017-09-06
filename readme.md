**Making websites is still too hard.**

Building a static site is pretty easy—but letting users log in, submit forms, and search is an order of magnitude harder. Many people who try just give up.

Luckily, some new tools are making it easier. Together, they make a pretty compelling package.

That's what Firefly is—a couple modern web tools put together to help you build real web apps. Think of it as a tiny alternative to Rails for building MVPs.

I built Firefly for myself to help me with my own projects. I hope you use it to make something of your own.

**Warning**: Firefly makes web development radically simple by not using backend servers, relational databases, unit tests, and other normal best-practices for large codebases.

**[Live Demo](https://firefly-66e12.firebaseapp.com)**

**Full documentation at [getfirefly.org](http://getfirefly.org)**
 - **[Philosophy](http://getfirefly.org/#philosophy)**
 - **[How it works](http://getfirefly.org/#how-it-works)**
 - **[Getting started](http://getfirefly.org/#getting-started)**
 - **[Next steps](http://getfirefly.org/#next)**


## App Structure

### [`/functions`](https://github.com/sampl/firefly/tree/master/functions)

This folder contains all of your app's backend code. Instead of running this code on a server, we're using Firebase Cloud Functions.

Because Firebase is a backend-as-a-service, you don't have to write a lot of the backend code that you do in a Ruby on Rails app or another "normal" backend. For example, you don't need to write code here to authenticate users, store sessions, validate form data, or retrieve and send stuff from the database.

### [`/public`](https://github.com/sampl/firefly/tree/master/public)

Files that will be available as-is when you go live. Use for image assets, css, etc

### [`/scripts`](https://github.com/sampl/firefly/tree/master/scripts)

This folder contains little javascript programs that you can manually run on the database. The rest of the app can't "see" these scripts. They're just here for the developer when doing maintenance.

Examples:
 - Add a bunch of test data to the database
 - Import data from somewhere else into the database
 - Manually save a backup copy of your database in JSON
 - Migrate data from one format to another

The `data` folder just has a simple json file as an example of something you might want to import.

You can use `sample-script.js` to import sample data. Copy this file and edit it whenever you need a new script.

### [`/src`](https://github.com/sampl/firefly/tree/master/src)

Short for "source". The Client folder contains the code that goes to the user's browser. This is where most of our app "lives".

When Webpack runs, it compiles all these files into just an `app.js` and `index.html` in the `/build` folder.

### [`/src/models`](https://github.com/sampl/firefly/tree/master/src/models)

Your models are code that get data from a server somewhere. Having this code separated into its own modules helps keep your app well-organized. These are mostly used by the React views in `/client`, but could be imported by scripts and functions too.

All of these models inherit methods from the `Supermodel.js` file, which contains a bunch of convenient functions for working with Firebase.

### [`/src/views`](https://github.com/sampl/firefly/tree/master/src/views)

React components to show our data

### [`/src/views/_layout`](https://github.com/sampl/firefly/tree/master/src/views/_layout)

Views related to the main wrapper, header, footer, etc

### [`/src/views/_util`](https://github.com/sampl/firefly/tree/master/src/views/_util)

Like "helpers"; utility views for conditional logic

### [`/src/views/posts`](https://github.com/sampl/firefly/tree/master/src/views/posts)

Views for CRUD of our main model, Posts

### [`/src/views/user`](https://github.com/sampl/firefly/tree/master/src/views/user)

Views related to Users
