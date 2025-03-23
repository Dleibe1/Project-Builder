import React from "react"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

const CreateBuildButton = () => {
  return (
    <Button
      component={Link}
      to="/create-new-build"
      id="new-build-button"
      sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" } }}
    >
      Create Build
    </Button>
  )
}

export default CreateBuildButton
