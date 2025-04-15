import React from "react"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

const SeeForkedVersions = ({ id }) => {
  return (
    <Button
      component={Link}
      className="large-button"
      to={`/project-forks/${id}`}
      sx={{
        my: 2,
        color: "white",
        margin: "0px 1rem 0px 0px",
        backgroundColor: "#1976d2",
        "&:hover": {
          backgroundColor: "#1665c0",
          color: "white",
        },
      }}
    >
      See Forks of this project
    </Button>
  )
}

export default SeeForkedVersions
