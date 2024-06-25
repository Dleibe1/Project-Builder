import React, { useState } from "react"
import { Button } from "@mui/material"

const SignOutButton = ({ signOut, shouldRedirect }) => {
  if (shouldRedirect) {
    location.href = "/project-list"
  }

  return (
    <Button
      onClick={signOut}
      id="sign-out-button"
      key={"sign-out-button"}
      sx={{ my: 2, color: "white",display: { xs: "none", md: "block" } }}
    >
      Sign Out
    </Button>
  )
}

export default SignOutButton
