import React from "react"

const GithubLogin = (props) => {

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/v1/github-user-sessions/login")
      const data = await response.json()
      window.location.href = data.githubAuthUrl
    } catch (error) {
      console.error("Error fetching GitHub login URL:", error)
    }
  }

  return (
    <div>
      <button
        id="github-login-button"
        className="sign-in authentication-button button"
        onClick={handleLogin}>
        <p id="github-login-text">Login with GitHub</p>
        <img id="github-logo" src="https://i.imgur.com/9aand0d.png" />
      </button>
    </div>
  )
}

export default GithubLogin
