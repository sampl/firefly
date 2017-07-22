# Firefly

A minimal single-page web-app boilerplate using firebase, react, and webpack.

This is intended to be an approachable starting place for writing "real" web apps. It's made **especially for designers** (and other people who are only used to writing a bit of client-side javascript but who don't have experience with servers and databases).

![Firefly](https://media.giphy.com/media/4BFo8uGv7NWeI/giphy.gif "Firefly")

## Required reading

 - [Firebase](firebase.google.com) is a Google service that makes developing single-page web-apps a lot easier for developers. You should read through the docs on [setting up for the web](https://firebase.google.com/docs/web/setup) (this is done for you in Firefly), the [real-time database](https://firebase.google.com/docs/database/web/start), and [authentication](https://firebase.google.com/docs/auth/web/start)
- Go through the guides for [React](https://facebook.github.io/react/docs/hello-world.html) and [React Router](https://reacttraining.com/react-router/web/guides)
- Learn about the [eventemitter3](https://github.com/primus/eventemitter3) library, which we use to listen for data changes and re-render react (instead of something like [Redux](https://egghead.io/courses/getting-started-with-redux))
- Learn about [npm packages and scripts](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)

## How to use Firefly

### Prerequisites

If you haven't already, [download and install node](https://nodejs.org/en/download/)

Install the node `firebase-tools` and package globally with `npm install -g firebase-tools`. You only need to do this once for each computer you use.

### Starting a new project

Each project you make using Firefly actually uses _two_ Firebase projects--one for development and staging, and one for the live production site. You'll follow these steps twice:

 1. Go to the [Firebase console](console.firebase.google.com) and sign in with your Google account
 2. Create a new project and name it something like `MyProjectName [Live]`
 3. Now click "Add Firebase to your web app" (look for the pink circle)
 4. You'll see a popup window with a block of code--save this text, you'll need it in a few minutes
 5. Return to step 2 and repeat, but call this project `MyProjectName [Stage]` or something similar

Now we can start writing code:

In your terminal, `cd` to the folder where you want your project to live, clone this repo with `git clone https://github.com/sampl/firefly`, then `cd firefly` and `npm install`. While the packages are installing, open the `firefly` folder in your favorite editor.

Now, in the `/config` folder, rename each file to remove ".example" (for ex: `firebase-config-dev.example.json` should now be `firebase-config-dev.json`). We're going to be putting security secrets in these files, and renaming them this way will keep them from getting committed into git (because the filenames without ".example" are listed in the `.gitignore` file).

Also rename `.firebaserc.example` to `.firebaserc`

When you're done, open up each of the renamed files and replace the empty spaces with the values you saved from the Firebase website.

### As you work

Start your app with `npm start` and open [http://localhost:8080/](http://localhost:8080/). You should see a basic web app! 😎

Now go back to your text editor and try editing some files. Changes to your code should automatically appear in the browser when you save.

### Deploying

When you're ready to deploy your app to stage (for testing or getting feedback from friends), run `npm run stage`

**Before going live, [secure your app](https://firebase.google.com/docs/database/security/) with `database.rules.json`**

When it's time to go live, run `npm run live`!

🎉🎉🎉

### Next steps

- [Use a custom domain](https://firebase.google.com/docs/hosting/custom-domain) like `www.myapp.com`. When you do, replace 'myapp.com' in `source/app.js` with the url of your real site.
- [Create a Service Account](https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app) to run maintenance scripts with `node scripts/test.js`
- To enable search, sign up for [Algolia](https://www.algolia.com/), [configure your functions credentials](https://firebase.google.com/docs/functions/config-env), and [upgrade your Firebase  plan](https://console.firebase.google.com) to a tier that has [Firebase functions](https://firebase.google.com/docs/functions/). See the server code at `/functions/index.js` for more details.
- Did I miss something? Could something be more clear? [Submit issues and PRs](https://github.com/sampl/firefly/issues)
