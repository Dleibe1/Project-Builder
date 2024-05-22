import React from "react"
import { Link } from "react-router-dom"

const EditBuildButton = ({ id, projectTitle }) => {
  return (
    <Link to={`/my-builds/${id}/${projectTitle}/edit`}>
      <button id="edit-build-button">Edit Build</button>
    </Link>
  )
}

export default EditBuildButton
