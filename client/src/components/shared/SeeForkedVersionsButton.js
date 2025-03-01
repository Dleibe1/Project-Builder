import React from "react"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

const SeeForkedVersionsButton = ({ id }) => {
  return (
    <Button
      onClick={(e) => e.stopPropagation()}
      component={Link}
      to={`/project-forks/${id}`}
      key={`project-tile-forks-button${id}`}
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
      className="see-forked-versions-button"
    >
      See Forks
    </Button>
  )
}

export default SeeForkedVersionsButton
