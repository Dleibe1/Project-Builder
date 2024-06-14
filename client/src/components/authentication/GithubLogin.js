import React from "react"

const GithubLogin = () => {
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
      <button className="button authentication-button" onClick={handleLogin}>Login with GitHub</button>
    </div>
  )
}

export default GithubLogin
