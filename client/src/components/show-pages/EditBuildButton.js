import React from "react"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

const EditBuildButton = ({ id }) => {
  return (
    <Button
      component={Link}
      to={`/edit-my-build/${id}`}
      className="large-button"
      id="edit-project"
      variant="contained"
      sx={{
        "&:hover": {
          textDecoration: "none",
          color: "white",
        },
      }}
    >
      Edit Build
    </Button>
  )
}

export default EditBuildButton
