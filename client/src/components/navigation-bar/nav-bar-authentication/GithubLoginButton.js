import React from "react"
import { Button } from "@mui/material"

const GithubLoginButton = (props) => {
  const handleGithubLogin = () => {
    window.location.href = "/api/v1/github-user-sessions/login"
  }

  return (
    <Button
      id="github-login-button"
      onClick={handleGithubLogin}
      key={"github-login-button"}
      sx={{
        my: 2,
        color: "white",
        display: { xs: "none", md: "flex" },
        marginRight: "1rem",
        "&:hover": {
          backgroundColor: "#1665c0",
          color: "white",
        },
      }}
    >
      <img onClick={handleGithubLogin} id="github-logo" src="/images/github-logo.png" />
      LOGIN WITH GITHUB
    </Button>
  )
}

export default GithubLoginButton