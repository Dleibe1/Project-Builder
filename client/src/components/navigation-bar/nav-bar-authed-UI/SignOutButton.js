import React from "react"
import { Button } from "@mui/material"

const SignOutButton = ({ signOut }) => {
  return (
    <Button
      onClick={signOut}
      id="sign-out-button"
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
      Sign Out
    </Button>
  )
}

export default SignOutButton
