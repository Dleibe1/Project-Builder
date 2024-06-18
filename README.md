<h3>This is very much a work in progress!</h3>
A demo of the app is currently hosted at https://project-builder-e7439342976b.herokuapp.com/

<h3>Current working features:</h3>

<h4>Login with GitHub (OAuth 2.0)</h4>

<h4>GitHub API:</h4>

   Generally, Arduino/ESP32 projects have all of the creator's code in a single file
   (usually a .ino file or main.cpp).
   After logging into to this app, Click "New Build."  Paste the url of your Arduino/ESP32
   main program file into the "Github main sketch file URL" section of at the bottom
   of the form.
   Example URL:  https://github.com/thisistamim/WIFI-Control-Car/blob/master/main.ino
   
   When users visit your project's page on this app, the code section is automatically populated
   with your main project file's code from GitHub.  This way you don't have to paste your code into
   this app every time you update your code on GitHub.  This feature does that automatically!

<h4>Create, Edit, and Fork projects:</h4>
   Micro controller projects come with more than just code.  There is also a parts list
   for any project.

   It is for this reason that I created the "Fork Project" feature, which 
   allows a user to fork another user's entire build, which includes
   the parts list in addition to the project's code.  
   Once a project fork is created, clicking "Project Forks" 
   on a project's display page will show the forked versions of the project.

## Usage

1. Install necessary dependencies with `yarn`:

   ```sh
   yarn install
   ```

2. In the root of the server folder, create a `.env` file to hold the environment variables listed below.  These environment variables are used for:
```
 SESSION_SECRET ...........Allows Passport to keep track of the currently signed-in user in session.
 GITHUB_API_KEY ...........Enables the GitHub API to fetch code from a user's main project (.ino or main.cpp) file.
 CLIENT_SECRET,
 CLIENT_ID ................These are necessary for generating a user access token for use with GitHub apps.
                           See GitHub apps documentation for more information:
                           https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps 
 AWS_ACCESS_KEY_ID,
 AWS_SECRET_ACCESS_KEY,
 S3_BUCKET_PRODUCTION,
 S3_BUCKET_DEVELOPMENT ....These are necessary for image uploading.  For more information, visit
                           https://aws.amazon.com/s3/
 BASE_URL .................Necessary for GitHub callback (used with GitHub apps) where a full URL path is required.
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

3. Create the base PostgreSQL database, breakable-toy_development

   ```sh
   createdb breakable-toy_development
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

7. Navigate to <http://localhost:3000>. You should see the homepage of
   the project-builder app, populated with example data.
