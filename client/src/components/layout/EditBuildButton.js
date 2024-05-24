import React from "react"
import { Link } from "react-router-dom"

const EditBuildButton = ({ id }) => {
  return (
    <Link to={`/edit-my-build/${id}`}>
      <button id="edit-build-button">Edit Build</button>
    </Link>
  )
}

export default EditBuildButton
