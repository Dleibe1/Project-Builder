import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

const SignInButton = (props) => {
  return (
    <Link to="/user-sessions/new">
      <Button
        id="sign-in-button"
        sx={{
          my: 2,
          color: "white",
          display: { xs: "none", md: "block" },
          "&:hover": {
            backgroundColor: "#1665c0",
            color: "white",
          },
        }}
      >
        Sign In
      </Button>
    </Link>
  )
}

export default SignInButton