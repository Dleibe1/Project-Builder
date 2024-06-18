This is very much a work in progress!

Current working features:

Login with GitHub (OAuth 2.0)

<h4>GitHub API:<h4>
   When creating a project, paste the url of your main Arduino/ESP32 project file.
   Example:  https://github.com/thisistamim/WIFI-Control-Car/blob/master/main.ino
   When users visit your project's page, the code section is automatically populated
   with your code from GitHub.  This way you don't have to paste your new code into
   your project site every time you update your program on GitHub.  The app will
   do this automatically.

Create, Edit, and Fork projects:
   Micro controller projects come with more than just code.  There is also a parts list
   for any project.  Sometimes, using different parts will work with the same code.
   For example, a remote control car project could be modified to use a larger power 
   supply and more powerful motors, while keeping the same code.

   This is why I created the "Fork Project" feature, which 
   allows you to fork another user's entire build, not just their code.  Once 
   a project fork is created, clicking "Project Forks" on a project's page
   will display the forked versions of the project.

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
