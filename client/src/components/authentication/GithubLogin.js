import React from "react"
import { Button } from "@mui/material"

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
    <Button
      id="my-builds-button"
      onClick={handleLogin}
      key={"my-builds"}
      sx={{ my: 2, color: "white", display: "block" }}
    >
      LOGIN WITH GITHUB
    </Button>
  )
}

export default GithubLogin
