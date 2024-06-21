import React from "react"
import { Link } from "react-router-dom"

const ForkProjectButton = ({ id }) => {
  return (
    <Link to={`/fork-projects/${id}`}>
      <button id="edit-build-button">Fork Project</button>
    </Link>
  )
}

export default ForkProjectButton
