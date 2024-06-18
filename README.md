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
