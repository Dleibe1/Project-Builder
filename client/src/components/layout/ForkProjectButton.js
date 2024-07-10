import React from "react"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

const ForkProjectButton = ({ id }) => {
  return (
    <Button
      component={Link}
      to={`/fork-project/${id}`}
      className="large-button"
      id="fork-project"
      variant="contained"
      sx={{
        "&:hover": {
          textDecoration: "none",
          color: "white",
        },
      }}
    >
      Fork This Project
    </Button>
  )
}

export default ForkProjectButton
