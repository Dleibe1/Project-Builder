import React from "react"
import { Link } from "react-router-dom"

const ProjectTile = ({ title, createdBy, thumbnailImage, id }) => {
  return (
    <Link to={`/projects/${id}`}>
      <div className="cell small-12 medium-6 large-4 project-tile">
        <div className="thumbnail-image-container">
          <img className="thumbnail-image" src={thumbnailImage} />
        </div>
        <h3>{title}</h3>
        <h4>Created By:</h4>
        <h5>{createdBy}</h5>
      </div>
    </Link>
  )
}

export default ProjectTile
