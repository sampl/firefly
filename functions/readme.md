Firefly backend functions

## Setting environment variables

Before running backend functions, you have to give Firebase your secret API keys. Unlike the front-end app, which uses `.env` files, you set environment vars in Cloud Functions in the Firefly CLI.

Official docs: **https://firebase.google.com/docs/functions/config-env**

1. First make sure you're using the right Firebase project with `firebase use dev`, for example. You should also set up keys for `stage` and `live`.

2. Then run this in your terminal, replacing "paste here" with the actual keys from the algolia and stripe website: `firebase functions:config:set algolia.appId="PASTE_HERE" algolia.adminKey="PASTE_HERE" stripe.secretKey="PASTE_HERE" stripe.planId="PASTE_HERE"` (add as many keys as necessary).

3. When you're done, run `npm run dev` (or stage, or live) to push the keys to the server.
