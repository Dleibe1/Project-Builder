import React from "react"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

const NewBuildButton = () => {
  return (
    <Button
      component={Link}
      to="/create-new-build"
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
      Create Build
    </Button>
  )
}

export default NewBuildButton
