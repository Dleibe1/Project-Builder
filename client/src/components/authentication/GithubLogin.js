import React from "react"
import { Button } from "@mui/material"

const GithubLogin = (props) => {
  const handleGithubLogin = async () => {
    try {
      const response = await fetch("/api/v1/github-user-sessions/login")
      const data = await response.json()
      window.location.href = data.githubAuthUrl
    } catch (error) {
      console.error("Error fetching GitHub login URL:", error)
    }
  }

  return (
    <Button
      id="github-login-button"
      onClick={handleGithubLogin}
      key={"github-login-button"}
      sx={{
        my: 2,
        color: "white",
        display: { xs: "none", md: "block" },
        marginRight: "1rem",
        "&:hover": {
          backgroundColor: "#1665c0",
          color: "white",
        },
      }}
    >
      <img onClick={handleGithubLogin} id="github-logo" src="images/github-logo.png" />
      LOGIN WITH GITHUB
    </Button>
  )
}

export default GithubLogin