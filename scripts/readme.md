# Scripts

This folder contains little javascript programs that you can manually run on the database. The rest of the app can't "see" these scripts. They're just here for the developer when doing maintenance.

Examples:
 - Add a bunch of test data to the database
 - Import data from somewhere else into the database
 - Manually save a backup copy of your database in JSON
 - Migrate data from one format to another

The `data` folder just has a simple json file as an example of something you might want to import.

You can use `sample-script.js` to import sample data. Copy this file and edit it whenever you need a new script.
