## Usage

1. Install necessary dependencies with `yarn`:

   ```sh
   yarn install
   ```

2. In the root of the server folder, create a `.env` file to hold the environment variables listed below.  These environment variables are used for:
```
 SESSION_SECRET ...........Allows Passport to keep track of the currently signed-in user in session.
 GITHUB_API_KEY ...........Enables the GitHub API to fetch code from a user's main project (.ino or main.cpp) file.

 AWS_ACCESS_KEY_ID,
 AWS_SECRET_ACCESS_KEY,
 S3_BUCKET_PRODUCTION,
 S3_BUCKET_DEVELOPMENT ....These are necessary for image uploading.  For more information, visit
                           https://aws.amazon.com/s3/
```

 `.env`:
   ```env
   SESSION_SECRET="your-session-secret"
   GITHUB_API_KEY="your-github-api-key"
   AWS_ACCESS_KEY_ID="your-AWS-key-id"
   AWS_SECRET_ACCESS_KEY="your-AWS-secret-access-key"
   S3_BUCKET_PRODUCTION="your-AWS-S3-bucket"
   S3_BUCKET_DEVELOPMENT="your-AWS-S3-bucket"
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
