import React from "react"
import { useEffect } from "react"

const HowToUse = () => {
  return (
    <div className="how-to-use">
      <div className="banner how-to-use-page-items-container landing-page-section-container-left top-banner">
        <img className="banner-image logo" src="https://i.imgur.com/dOywizt.png" />
        <h1>Create and Fork Micro Controller Projects</h1>
      </div>
      <div className="announcement how-to-use-page-items-container banner">
        <p>🚧 This is a work in progress 🚧</p>
      </div>
      <div className="how-to-use-page-items-container top">
        <h1>Login with these credentials in order to see a built out user experience:</h1>
        <div className="example-user-credentials">
          <div className="example-credential">
            <h2>Email:</h2>
            <h3 id="example-email">example@example.com </h3>
          </div>
          <div className="example-credential">
            <h2>Password:</h2>
            <h3 id="example-password">cat</h3>
          </div>
        </div>
        <p>
          As an alternative, you can login in with GitHub or create an account. Once logged in,
          click “New Build” to post your Micro controller project to the site. Click “My Builds” to
          view and edit the list of projects you've created.
        </p>
      </div>
      <div className="how-to-use-page-items-container how-to-fork">
        <h1>Fork another user's project</h1>
        <p>
          Micro controller projects don't just come with code to run on the Micro controller. They
          are made of physical stuff, like H-bridges and LED's. If you want to share a project that
          is similar to another project that already exists, why start from scratch?
          Why not also give some credit to the project that inspired yours?
        </p>
        <p>
          When you fork another user's project on Project Builder, you can change the parts list to
          add or remove parts, or change the instructions for constructing the project.  These instructions can include
          pictures of wiring schematics.
        </p>
        <p>
          For example, let's say you like someone's 2-wheel-drive car project and want to make a 4-wheel-drive version.  You can fork that 
          user's project, add two more motors to the parts list, update the instructions to include your wiring schematic for the car, and
          presto you're done!  You just saved some time and gave credit to the project that inspired yours.
        </p>
        <h2>Steps:</h2>
        <ol>
          <li>
            Login with the sample user credentials above. As an alternative, you may also create an
            account or login with GitHub.
          </li>
          <li>Click the "PROJECTS" link on the top bar.</li>
          <li>Click on a project's thumbnail to view the project.</li>
          <li>
            From the project's display page, click the "Fork Project" button to create your own
            version of the project.
          </li>
        </ol>
      </div>
      <div className="how-to-use-page-items-container third">
        <h1>Keep your project's code up to date automatically</h1>
        <p>
          When creating or forking a project, paste the URL path to your main project file on GitHub
          into the “GitHub main sketch file URL” field near the bottom of the form.
        </p>
        <p>Example URL text:</p>
        <p className="example-github-url">
          https://github.com/thisistamim/WIFI-Control-Car/blob/master/main.ino
        </p>
        <p>
          The app uses the GitHub API to retrieve the contents of that file (if the project is
          public) and will display the code under the “Code” section of the project's display page.
          This way you don't have to worry about keeping your project's code up to date in two
          places (your GitHub and this app).
        </p>
        <p>
          Code highlighting is applied using the Highlight.js library to keep your code looking
          pretty on the project's display page.
        </p>
      </div>
    </div>
  )
}

export default HowToUse
