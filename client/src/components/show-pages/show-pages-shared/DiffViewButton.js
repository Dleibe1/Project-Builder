import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

const DiffViewButton = ({ parentProjectId, forkedProjectId }) => {
  return (
    <Button
      component={Link}
      to={`/diff-view/${parentProjectId}/${forkedProjectId}`}
      className="large-button diff-view-button"
      variant="contained"
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
      View Changes
    </Button>
  )
}

export default DiffViewButton
