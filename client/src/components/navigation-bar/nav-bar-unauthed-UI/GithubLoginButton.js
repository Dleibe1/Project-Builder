import React from "react"
import { Button } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"

const GithubLoginButton = (props) => {
  const handleGithubLogin = () => {
    window.location.href = "/api/v1/github-user-sessions/login"
  }

  return (
    <Button
      id="github-login-button"
      onClick={handleGithubLogin}
      key={"github-login-button"}
      startIcon={<GitHubIcon />}
      sx={{
        my: 2,
        color: "white",
        display: {xs: "none", sm: "none", md: "flex", lg: "flex" },
        marginRight: "1rem",
        "&:hover": {
          backgroundColor: "#1665c0",
          color: "white",
        },
      }}
    >
      LOGIN WITH GITHUB
    </Button>
  )
}

export default GithubLoginButton