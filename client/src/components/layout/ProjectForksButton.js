import React from "react"
import { Link } from "react-router-dom"

const ProjectForksButton = ({ id }) => {
  return (
    <Link to={`/project-forks/${id}/fork-list`}>
      <button id="edit-build-button">Project Forks</button>
    </Link>
  )
}

export default ProjectForksButton
