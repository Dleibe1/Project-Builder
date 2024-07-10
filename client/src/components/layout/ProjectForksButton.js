import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';

const ProjectForksButton = ({ id }) => {
  return (
      <Button
        component={Link}
        to={`/project-forks/${id}`}
        className="project-tile-forks-button"
        key={`project-tile-forks-button${id}`}
        sx={{
          my: 2,
          color: "white",
          backgroundColor: "#1976d2", 
          "&:hover": {
            backgroundColor: "#1665c0",
            color: "white",
          },
        }}
      >
        See Forked Versions
      </Button>
  )
}

export default ProjectForksButton
