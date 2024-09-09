import React from "react"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

const MyBuildsButton = () => {
  return (
    <Button
      component={Link}
      to="/my-builds-list?page=1"
      id="my-builds-button"
      key={"new-build-button"}
      sx={{display: { xs: "none", md: "block" }}}
    >
      My Builds
    </Button>
  )
}

export default MyBuildsButton
