# Firebase backend functions

This folder contains a little backend code for updating our search index when a post changes, keeping subscriptions in sync with stripe, and updating the number of likes on each post, etc.

**[Documentation for Firebase Functions](https://firebase.google.com/docs/functions/)**

## Setting environment variables

Before running backend functions, you have to give Firebase your secret API keys. This can be done manually using the [Firebase CLI](https://firebase.google.com/docs/functions/config-env).

For your convenience, Firefly makes this a little easier by including `.env` files in the functions directory.

1. First you'll have to remove ".example" from the filename of the `.env` files in `functions/`
2. Add the actual keys from the algolia and stripe websites to those files
3. Save keys to Firebase servers by running `sh functions/.env.dev`, `sh functions/.env.stage`, or `sh functions/.env.live`

You can also simply copy/paste the contents of functions env files in your terminal.