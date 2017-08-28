An approachable starting place for writing "real" web apps. Firefly was made **especially for designers** (and other people who are only used to writing a bit of client-side javascript but who don't have experience with servers and databases).

## Full documentation at [getfirefly.org](http://getfirefly.org)

## [Live Demo](https://firefly-66e12.firebaseapp.com)


# Folder Structure

### `/functions`

This folder contains all of your app's backend code. Instead of running this code on a server, we're using Firebase Cloud Functions.

Because Firebase is a backend-as-a-service, you don't have to write a lot of the backend code that you do in a Ruby on Rails app or another "normal" backend. For example, you don't need to write code here to authenticate users, store sessions, validate form data, or retrieve and send stuff from the database.

### `/public`

Files that will be available as-is when you go live. Use for image assets, css, etc

### `/scripts`

This folder contains little javascript programs that you can manually run on the database. The rest of the app can't "see" these scripts. They're just here for the developer when doing maintenance.

Examples:
 - Add a bunch of test data to the database
 - Import data from somewhere else into the database
 - Manually save a backup copy of your database in JSON
 - Migrate data from one format to another

The `data` folder just has a simple json file as an example of something you might want to import.

You can use `sample-script.js` to import sample data. Copy this file and edit it whenever you need a new script.

### `/src`

Short for "source". The Client folder contains the code that goes to the user's browser. This is where most of our app "lives".

When Webpack runs, it compiles all these files into just an `app.js` and `index.html` in the `/build` folder.

### `/src/models`

Models handle moving data in and out of our Firebase database

### `/src/views`

React components to show our data

### `/src/views/_layout`

Views related to the main wrapper, header, footer, etc

### `/src/views/_util`

Like "helpers"; utility views for conditional logic

### `/src/views/posts`

Views for CRUD of our main model, Posts

### `/src/views/posts`

Views related to Users

**Read the [full documentation](http://getfirefly.org)**
