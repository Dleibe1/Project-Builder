
## Usage

1. Install necessary dependencies with `yarn`:

   ```sh
   yarn install
   ```

2. In the root of the server folder, create a `.env` file to hold the session secret and GitHub API Key. This will allow Passport to keep track of the currently signed-in user in session and enable the GitHub API to fetch code from a user's main project file. Include a SESSION_SECRET and GITHUB_API_KEY in the `.env`:

   ```env
   SESSION_SECRET="ff521741-6d5a-48d2-96a9-b95bbcf60bc4"
   GITHUB_API_KEY="Your-GitHub-API-Key"
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

7. Navigate to <http://localhost:3000>. You should see the homepage of
   the project-builder app, populated with example data.

