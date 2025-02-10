import React from "react"

const HowToUse = () => {
  window.scrollTo(0, 0)
  return (
    <div className="how-to-use">
      <div className="banner how-to-use-page-items-container about-page-section-container-left top-banner">
        <img className="banner-image logo" src="https://i.imgur.com/dOywizt.png" />
        <h1>Create and Fork Arduino Projects</h1>
      </div>
      <div className="announcement how-to-use-page-items-container banner">
        <p>🚧   This site is a work in progress   🚧</p>
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
            As an alternative, you can login in with GitHub or create an account.  Once logged in,
            click “New Build” to post your Microcontroller project to the site.  Click “My Builds” to
            view and edit the list of projects you've created.
          </p>
        </div>
        <div className="how-to-use-page-items-container how-to-fork">
          <h1>Fork another user's project</h1>
          <p>
            Create your own version of another user's project.  You can change any aspect of the
            project that you'd like.  This includes the code, parts list, instructions, and project
            images.
          </p>
          <h2>Steps:</h2>
          <ol>
            <li>
              Login with the sample user credentials above.  As an alternative, you may also
              create an account or login with GitHub.
            </li>
            <li>Click the "HOME" link on the top bar.</li>
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
            When creating or forking a project, paste the URL path to your main project file on
            GitHub into the “GitHub main sketch file URL” field near the bottom of the form.
          </p>
          <p>Example URL text:</p>
          <p className="example-github-url">https://github.com/thisistamim/WIFI-Control-Car/blob/master/main.ino</p>
          <p>
            The app uses the GitHub API to retrieve the contents of that file (if the project is
            public) and will display the code under the “Code” section of the project's display
            page.  This way you don't have to worry about keeping your project's code up to date in
            two places (your GitHub and this app).
          </p>
          <p>
            Code highlighting is applied using the Highlight.js
          </p>
        </div>
    </div>
  )
}

export default HowToUse
