import React from "react"
import { Link } from "react-router-dom"

const ForkBuildButton = ({ id }) => {
  return (
    <Link to={`/projects/${id}/fork`}>
      <button id="edit-build-button">Fork Project</button>
    </Link>
  )
}

export default ForkBuildButton
