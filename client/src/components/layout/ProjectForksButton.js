import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';

const ProjectForksButton = ({ id }) => {
  return (
    <Link to={`/project-forks/${id}`}>
      <Button variant="contained">Project Forks</Button>
    </Link>
  )
}

export default ProjectForksButton
