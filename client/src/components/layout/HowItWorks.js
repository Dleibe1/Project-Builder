import React from "react"
import { Link } from "react-router-dom"

const HowItWorks = () => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <h1>View, share, and fork Arduino and ESP32 Projects!</h1>
        <Link to="/project-list" className="main-link">
          Click here to continue to the app
        </Link>
      </div>
      <div className="content-section">
        <h2>Getting Started</h2>
        <p>
          After creating an account or logging in with GitHub, click “New Build” to post your
          Microcontroller project to the site. Click “My Builds” to view the list of builds you've
          created.
        </p>
        <h2>Fork another user's project:</h2>
        <p>
          Create your own version of another user's project. You can change any aspect of the
          project that you'd like. This includes the code, parts list, instructions, and project
          images.
        </p>
        <p>
          <h4>Steps:</h4>
          1.  Click on a project thumbnail to view its display page.  Click the orange “Fork Project” button to create a fork of
          that project.
        </p>
        <p>
          2.  After a project has been forked, clicking the orange “Project Forks” button on a project's
          display page will show you a list of forked versions of the project.
        </p>
        <h2>Keep your project's code up to date automatically:</h2>
        <p>
          When creating or forking a project, paste the URL path to your main project file on GitHub
          into the “GitHub main sketch file URL:” field near the bottom of the form.
        </p>
        <p>
          Example URL text:  https://github.com/thisistamim/WIFI-Control-Car/blob/master/main.ino
        </p>
        <p>
          The app uses the GitHub API to retrieve the contents of that file (if the project is
          public) and will display the code under the “Code” section of the project's display page.
          This way you don't have to worry about keeping your project's code up to date in two
          places (your GitHub and this app).
        </p>
        <p>
          Code highlighting is applied using the Highlight.js library to keep your code looking pretty on the project's display page.
        </p>
      </div>
      <div className="hero-section">
        <Link to="/project-list" className="main-link">
          Click here to continue to the app
        </Link>
      </div>
    </div>
  )
}

export default HowItWorks
