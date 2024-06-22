import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

const SignInButton = (props) => {
  return (
    <Link to="/user-sessions/new">
      <Button
        id="sign-in-button"
        key={"sign-in-button"}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        Sign In
      </Button>
    </Link>
  )
}

export default SignInButton
