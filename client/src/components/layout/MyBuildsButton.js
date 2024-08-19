import React from "react"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

const MyBuildsButton = () => {
  return (
    <Button
      component={Link}
      to="/my-builds-list"
      id="new-build-button"
      key={"new-build-button"}
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
      My Builds
    </Button>
  )
}

export default MyBuildsButton
