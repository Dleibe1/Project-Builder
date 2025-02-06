# 🚧 This is a work in progress 🚧
## A Project Building Assistant for Arduino Micro Controller Apps

#### Create, Edit, and Fork projects:

Arduino projects require a lot of tedious boilerplate, such as the code to control motors with analog joysticks, the setup for an ultrasonic distance sensor, or an algorithm for object avoidance with a car project.  

Unlike desktop applications, however, Arduino projects have boilerplate in terms of the parts list, schematics, and instructions for building a physical device that may be similar to a device someone else has created.

Project Builder allows users to take advantage of the similarities between their project and projects created by other users.  Project creators can fork the code, parts, schematics, and list of instructions of other projects. 

A demo of the app is currently hosted at [https://project-builder-e7439342976b.herokuapp.com/](https://project-builder-e7439342976b.herokuapp.com/)

The boilerplate code used for the app can be found here:
[https://github.com/LaunchAcademy/engage-boilerplate](https://github.com/LaunchAcademy/engage-boilerplate)

#### Login with GitHub (OAuth 2.0)

#### GitHub API:

Generally, Arduino/ESP32 projects have all of the creator's code in a single file (usually a .ino file or main.cpp). After logging into to this app, Click "New Build." Paste the URL of your Arduino/ESP32 main program file into the "Github main sketch file URL" section at the bottom of the form.
Example URL: https://github.com/thisistamim/WIFI-Control-Car/blob/master/main.ino

When users visit your project's page on this app, the code section is automatically populated with your main project file's code from GitHub. This way you don't have to paste your code into this app every time you update your code on GitHub. This feature does that automatically!


### Other technologies used in the creation of this app:

- React.js
- Express.js
- Objection.js
- PostgreSQL
- OAuth 2.0 (GitHub Apps)
- Cypress.js (Tests are a work in progress)
- Material UI

### Improvements coming soon:

1. More Material UI integration.
2. Option to add a link to purchase parts from the parts list.

### Dream features:

1. Generative AI API integration for code suggestions.
2. More usage of GitHub apps. Currently, it's just there to log in with GitHub.

## Usage

1. Install necessary dependencies with `yarn`:

   ```sh
   yarn install
   ```

2. In the root of the server folder, create a `.env` file to hold the environment variables listed below.  These environment variables are used for:

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
                           base URL of your hosting site. 
                           For example, https://project-builder-e7439342976b.herokuapp.com
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

3. Create the base PostgreSQL database, project-builder_development

   ```sh
   createdb project-builder_development
   ```

4. Run the included table migrations:

   ```sh
   cd server
   yarn migrate:latest
   ```

5. Run the seeder file to populate the app with example data:

   ```sh
   cd server
   yarn db:seed
   
   ```

6. Start up the application, from the root folder:

   ```sh
   cd .. # if in the server folder

   yarn run dev
   ```

7. Navigate to http://localhost:3000. You should see the introduction page of the Project Builder application.

8. A user has been seeded for use on the site.

```
Username: example@example.com
Password: cat
```
