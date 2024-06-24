import React from "react"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

const NewBuildButton = () => {
  return (
    <Link to="/create-new-build">
      <Button
        id="new-build-button"
        key={"new-build-button"}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        Create Build
      </Button>
    </Link>
  )
}

export default NewBuildButton
