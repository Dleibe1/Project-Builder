import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

const SignUpButton = (props) => {
  return (
    <Link to="/users/new">
      <Button
        id="sign-up-button"
        key={"sign-up-button"}
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
        Sign Up
      </Button>
    </Link>
  )
}

export default SignUpButton
