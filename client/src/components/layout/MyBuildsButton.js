import React from "react"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

const MyBuildsButton = () => {
  return (
    <Link to="/my-builds">
      <Button
        id="my-builds-button"
        key={"my-builds-button"}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        My Builds
      </Button>
    </Link>
  )
}

export default MyBuildsButton
