import React from "react"
import { Link } from "react-router-dom"

const ProjectTile = ({ title, createdBy, thumbnailImage, id }) => {

  return (
    <Link to={`/projects/${id}`}>
      <div className="cell small-3 medium-6 large-4 project-tile">
        <img id="thumbnail-image" src={thumbnailImage} />
        <h3>{title}</h3>
        <h4>Created By:</h4>
        <h5>{createdBy}</h5>
      </div>
    </Link>
  )
}

export default ProjectTile
