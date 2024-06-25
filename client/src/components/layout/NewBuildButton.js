import React from "react"
import { useHistory } from "react-router-dom"
import Button from "@mui/material/Button"

const NewBuildButton = () => {
  const history = useHistory()
  return (
    <Button
      onClick={() => {
        history.push("/create-new-build")
      }}
      id="new-build-button"
      key={"new-build-button"}
      sx={{ my: 2, color: "white", display: { xs: "none", md: "block" } }}
    >
      Create Build
    </Button>
  )
}

export default NewBuildButton
