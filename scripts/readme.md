# Firefly scripts

This "scripts" folder contains code that you, the developer, can run from your own machine. Useful for adding dummy data, "migrations", etc.

## Examples

This folder includes two sample scripts:

1. `add-fake-posts.js` will add fake posts to the database from `/scripts/data/fake-posts.json`. Something like this might be useful if you're importing data from some file or other database.
2. `sample-migration.js` is a simple "migration", a script that will update the documents in the database. In this case, it downloads all posts, makes the title of each post UPPERCASE, and re-saves the post.

To try it out, `cd` into this folder and run `node add-fake-posts.js` or `node sample-migration.js`