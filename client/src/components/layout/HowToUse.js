import React from "react"
import { Link } from "react-router-dom"

const HowToUse = () => {
  return (
    <div className="landing-page">
      <div className="announcement">
        <p>🚧 This site is a work in progress and is primarily for portfolio building. 🚧</p>
        <p>More features and improvements coming soon! </p>
        <p>
          Connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/daniel-patrick-leibensperger/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </div>
      <div className="hero-section">
        <h1>View, share, and fork Arduino and ESP32 Projects!</h1>
      </div>
      <div className="content-section">
        <h2>Sample User Instructions</h2>
        <p>
          <a
            href="https://www.arduino.cc/en/Guide/Introduction"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get familiar with Arduino.
          </a>
        </p>
        <p>Login with the example account:</p>
        <ol>
          <li>Click "Sign In"</li>
          <li>Use the following credentials:</li>
        </ol>
        <h5>Email:</h5>
        <h4>example@example.com </h4>
        <h5>Password:</h5>
        <h4>cat</h4>
        As an alternative, you can login in with GitHub or create an account. Once logged in, click “New Build” to
        post your Microcontroller project to the site. Click “My Builds” to view and edit the list
        of projects you've created.
        <h2>Fork another user's project:</h2>
        <p>
          Create your own version of another user's project. You can change any aspect of the
          project that you'd like. This includes the code, parts list, instructions, and project
          images.
        </p>
        <h4>Steps:</h4>
        <p>1. Login using the sample user account, create an account or login with GitHub.</p>
        <p>
          2. Click the "Projects" button on the top bar to visit the list of user-created projects.  Clicking "Forked Versions" on a project's thumbnail will bring you to forked versions of the project. 
        </p>
        <p>
        3. Clicking on a project's thumbnail will bring you to the project's display page.  Click the “Fork Project” button to create a fork of that project.
        </p>
        <p>
          4. After a project has been forked, clicking the “Project Forks” button on a project's
          display page will show you a list of the forked versions of the project.
        </p>
        <h2>Keep your project's code up to date automatically:</h2>
        <p>
          When creating or forking a project, paste the URL path to your main project file on GitHub
          into the “GitHub main sketch file URL:” field near the bottom of the form.
        </p>
        <p>Example URL text:</p>
        <p>https://github.com/thisistamim/WIFI-Control-Car/blob/master/main.ino</p>
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
