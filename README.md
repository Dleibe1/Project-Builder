# [A Project Building Assistant for Arduino Micro Controller Apps](https://project-builder-e7439342976b.herokuapp.com/?page=1)
## [Click here for a 5 minute demo of the app]([Click here for a 5 minute demo of the app](https://www.youtube.com/watch?v=ebnX3dC0sso))
### Technologies used in the creation of this app:

- React.js
- Express.js
- Knex.js for query building.
- Objection.js for relational query building, Object Relational Mapping, and database schema validations.
- PostgreSQL
- OAuth 2.0
- The GitHub API to keep a user's code in sync with their code on GitHub.
- Material UI
- AWS S3 Bucket
- TinyMCE Wysiwyg editor
- turndown.js for html to markdown conversions.
- showdown.js for markdown to html conversions.
- highlight.js for code highlighting.
- Cypress.io for end to end testing ([Click here to see the integration files](https://github.com/Dleibe1/Project-Builder/tree/main/e2e/cypress/integration))

## A user has been seeded for use on the site.  

```
Username: example@example.com
Password: cat
```
Login as the example user and click "MY BUILDS" to view and edit your projects.  View another user's project and click "FORK THIS PROJECT" to create your own version of their project.

## Create, Edit, and Fork Arduino Projects

### The app is curently hosted at [https://project-builder-e7439342976b.herokuapp.com/](https://project-builder-e7439342976b.herokuapp.com/)

Arduino projects require a lot of tedious boilerplate, such as code to control motors with analog joysticks, or the setup for an ultrasonic distance sensor.

Unlike desktop applications, Arduino projects have other boilerplate in the form of a parts list, schematics, and instructions for assembling the project.  That's because each Arduino project is a unique physical device.

Project Builder allows users to take advantage of the similarities between their project idea and a project that's already been shared by another user.  This app also gives credit to both the originoal project's creator and a user that creates a fork of that project.  Project Builder allows users to fork the code, parts, and instructions of other users' projects.
  
### GitHub API for retrieving a project's code:

Often, code written for Arduino projects by casual hobbyists exists in a single file, usually a .ino or .cpp file.  If this file is hosted on GitHub, users can have Project Builder retrieve that file's code rather than entering the project's code in two places (GitHub and Project Builder).

When creating, editing, or forking a project, Paste the URL of your project's main code file on GitHub into the "Github main sketch file URL" section at the bottom of the form.
Example URL: https://github.com/thisistamim/WIFI-Control-Car/blob/master/main.ino

When users visit your project's page on this app, the code section is automatically populated with your main project file's code from GitHub. This way you don't have to paste your code into this app every time you update your code on GitHub. This feature does that automatically!

## The TinyMCE Editor has been modified to include unique features.
 Users can upload a markdown file containing your instructions and the contents will be converted to HTML.  This is convenient for GitHub users who may already host their projecct on GitHub.  This is also convenient for users that have created larger, more advanced projects and would prefer to use their favorite text editor to create a markdown version of their project.
<img width="1673" alt="Screenshot 2025-03-20 at 12 39 09 PM" src="https://github.com/user-attachments/assets/226d9af4-41bf-4700-a739-948eca537184" />

## [A Diff View has been added for projects that have forked versions]([http://localhost:3000/diff-view/2/20](https://project-builder-e7439342976b.herokuapp.com/diff-view/2/20))
Now when a project has a forked version, users can view the changes with a GitHub style diff view.
<img width="1614" alt="Screenshot 2025-03-20 at 12 50 16 PM" src="https://github.com/user-attachments/assets/157c4f1c-c6a5-44a9-8e14-c239d04a590b" />

This app started with [this boilerplate code](https://github.com/LaunchAcademy/engage-boilerplate)

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
