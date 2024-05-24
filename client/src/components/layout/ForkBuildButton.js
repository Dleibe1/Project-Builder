import React from "react"
import { Link } from "react-router-dom"

const ForkBuildButton = ({ id }) => {
  return (
    <Link to={`/fork/${id}`}>
      <button id="edit-build-button">Fork Project</button>
    </Link>
  )
}

export default ForkBuildButton
