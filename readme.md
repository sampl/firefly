# Firefly

A minimal single-page web-app boilerplate using firebase, react, and webpack.

This is intended to be an approachable starting place for writing "real" web apps, especially for people who are only used to writing a bit of client-side javascript but who don't have experience with servers and databases.

![Firefly](https://media.giphy.com/media/4BFo8uGv7NWeI/giphy.gif "Firefly")

## How to Use

### Read this

- First, go through the guides for [React](https://facebook.github.io/react/docs/hello-world.html) and [React Router](https://reacttraining.com/react-router/web/guides)
- Learn about the [eventemitter3](https://github.com/primus/eventemitter3) library, which we use to listen for data changes and re-render react (instead of something like Flux or Redux)
- You should also learn more about [Firebase](https://firebase.google.com/docs/web/setup), especially the [real-time database](https://firebase.google.com/docs/database/web/start) and [authentication](https://firebase.google.com/docs/auth/web/start)
- Learn about [npm packages and scripts](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)

### Setting up the code

First, if you haven't already, [download and install node](https://nodejs.org/en/download/)

In your terminal, clone this repo with `git clone https://github.com/sampl/firefly`

Run `cd firefly` to move into the new project directory

Run `npm install` to install all the packages you'll need

Now open the `firefly` folder in your favorite editor (I recommend [Atom](https://atom.io/))

### Making your Firebase projects

[Firebase](firebase.google.com) is a Google service that makes developing single-page web-apps a lot easier for developers.

Each project you make using Firefly actually uses _two_ Firebase projects--one for development and staging, and one for the live site. So, follow these steps twice:

 1. Go to the [Firebase console](console.firebase.google.com) and sign in with your Google account
 2. Create a new project and name it something like `MyProjectName [Live]`
 3. Now click "Add Firebase to your web app" (near the pink circle)
 4. You'll see a popup window with a block of code--save this code, you'll need it in a few minutes
 5. Return to step 2 and repeat, but call this project `MyProjectName [Stage]` or something similar

### Connecting your project to Firebase

Before we can run our project or push it live, we need to connect your code to the Firebase projects you just made.

First, install the node `firebase-tools` package globally with `npm install -g firebase-tools`. You only need to do this once for each computer you use.

Next, let's rename a few files. This will keep them from getting committed to git since the new names are listed in the `.gitignore` file.

```
rename  .firebaserc.example                 to   .firebaserc.example
rename  firebase-config-live.example.json   to   firebase-config-live.json
rename  firebase-config-stage.example.json  to   firebase-config-stage.json
```

Now open up each of the renamed files and add the values you saved from the Firebase website into the empty spaces.

### As you work

Almost there! Start your app with `npm start` and open [http://localhost:8080/](http://localhost:8080/)--you should see a basic web app! 😎

Now go back to your text editor and try editing some files. Changes to your code should automatically appear in the browser when you save.

When you're ready to deploy your app to stage (for testing or getting feedback from friends), run `npm run stage`

### Going live

**Before going live, don't forget to [secure your app](https://firebase.google.com/docs/database/security/) with `database.rules.json`**

Also, replace 'myapp.com' in `source/app.js` with the url of your real site.

When it's time to go live, run `npm run live`

🎉🎉🎉

### Next steps

- Set up a custom domain (www.myapp.com) and configure (free!) HTTPS on https://firebase.google.com/
- Use Firebase functions to write server-side code
- Did I miss something? Could something be more clear? Submit issues and PRs at https://github.com/sampl/firefly!
