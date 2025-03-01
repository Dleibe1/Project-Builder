# A Project Building Assistant for Arduino Micro Controller Apps

## Create, Edit, and Fork Arduino Projects

### A demo of the app is currently hosted at [https://project-builder-e7439342976b.herokuapp.com/](https://project-builder-e7439342976b.herokuapp.com/)

Arduino projects require a lot of tedious boilerplate, such as the code to control motors with analog joysticks, the setup for an ultrasonic distance sensor, or an algorithm for object avoidance with a car project.  

Unlike desktop applications, however, Arduino projects have physical boilerplate in terms of the parts list, schematics, and instructions for assembling and coding a device that may be similar to a device someone else has created.

Project Builder allows users to take advantage of the similarities between their project and projects created by other users.  Project creators can fork the code, parts, and instructions of other projects.

The boilerplate code used for the app can be found here:
[https://github.com/LaunchAcademy/engage-boilerplate](https://github.com/LaunchAcademy/engage-boilerplate)

### GitHub API for retrieving a project's code:

Often, code written for Arduino projects by casual hobbyists exists in a single file, usually a .ino or .cpp file.  If this file is hosted on GitHub, users can have Project Builder retrieve that file's code rather than entering the project's code in two places (GitHub and Project Builder).

When creating, editing, or forking a project, Paste the URL of your project's main code file on GitHub into the "Github main sketch file URL" section at the bottom of the form.
#### Example URL: https://github.com/thisistamim/WIFI-Control-Car/blob/master/main.ino

When users visit your project's page on this app, the code section is automatically populated with your main project file's code from GitHub. This way you don't have to paste your code into this app every time you update your code on GitHub. This feature does that automatically!


### Other technologies used in the creation of this app:

- React.js
- Express.js
- Knex.js
- Objection.js
- PostgreSQL
- OAuth 2.0 (login with GitHub)
- GitHub API
- Material UI
- AWS S3 Bucket
- [TinyMCE](https://www.tiny.cloud/)
- [turndown.js](https://www.npmjs.com/package/turndown/v/4.0.0-rc.1)
- [showdown.js](https://showdownjs.com/)
- [highlight.js](https://highlightjs.org/)
- Cypress.js (Tests suite is a work in progress)

### New features:
- Download a project's instructions as a markdown file
- Upload a project's instructions as a markdown file

### Improvements coming soon:

1. Option to add a link to purchase parts from the parts list.

## Usage

1. Install necessary dependencies with `yarn`:

   ```sh
   yarn install
   ```

2. In the root of the server folder, create a `.env` file to hold the environment variables listed below.  These environment variables are used for:
`.env`:
   ```env
   SESSION_SECRET .........This is for Passport.  Allows Passport to keep track of the currently signed-in user in session.
   GITHUB_API_KEY .........You will need a GitHub API key to fetch code from a user's main project (.ino or main.cpp) file.
   CLIENT_SECRET,
   CLIENT_ID .............CLIENT_SECRET and CLIENT_ID are obtained when registering this app with GitHub Apps.  
                           They are necessary for generating a user access token, which allows the app to perform actions with GitHub on the user's behalf.
                           See GitHub apps documentation for more information:
                           https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps 
   AWS_ACCESS_KEY_ID,
   AWS_SECRET_ACCESS_KEY,
   S3_BUCKET_PRODUCTION,
   S3_BUCKET_DEVELOPMENT ....These are necessary for image uploading.  For more information, visit
                           https://aws.amazon.com/s3/
                           
   BASE_URL .................This is necessary for the GitHub callback address (used with GitHub apps) where a full URL path is required.
                           If hosting this app on the web, be sure to replace http://localhost:3000 with the
                           base URL of your hosting site if you're not running the project locally. 
                           For example: "https://project-builder-e7439342976b.herokuapp.com"

   ```

 `.env`:
   ```env
   SESSION_SECRET="your-session-secret"
   GITHUB_API_KEY="your-github-api-key"
   CLIENT_SECRET="your-client-secret"
   CLIENT_ID="your-client-id"
   AWS_ACCESS_KEY_ID="your-AWS-key-id"
   AWS_SECRET_ACCESS_KEY="your-AWS-secret-access-key"
   S3_BUCKET_PRODUCTION="your-AWS-S3-bucket"
   S3_BUCKET_DEVELOPMENT="your-AWS-S3-bucket"
   BASE_URL="http://localhost:3000"
   ```

3. If running the project locally, go to [getDatabaseUrl.cjs"](client/config/getDatabaseUrl.cjs) 
   and make sure the database URL is the same as your PostgresSQL database.


4. Create the base PostgreSQL database, project-builder_development

   ```sh
   createdb project-builder_development
   ```

5. Run the included table migrations:

   ```sh
   cd server
   yarn migrate:latest
   ```

6. Run the seeder file to populate the app with example data:

   ```sh
   cd server
   yarn db:seed
   
   ```

7. Start up the application, from the root folder:

   ```sh
   cd .. # if in the server folder

   yarn run dev
   ```

8. Navigate to http://localhost:3000. You should see the introduction page of the Project Builder application.

9. A user has been seeded for use on the site.

```
Username: example@example.com
Password: cat
```
