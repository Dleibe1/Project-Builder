import React from "react"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

const ReturnToParentProjectButton = ({ parentProjectId }) => {
  return (
    <Button
      component={Link}
      className="large-button"
      to={`/projects/${parentProjectId}`}
      sx={{
        my: 2,
        color: "white",
        margin: "0px",
        backgroundColor: "#1976d2",
        "&:hover": {
          backgroundColor: "#1665c0",
          color: "white",
        },
      }}
    >
      View Original Project
    </Button>
  )
}

export default ReturnToParentProjectButton
