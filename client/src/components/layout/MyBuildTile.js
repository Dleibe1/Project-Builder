import React from "react"
import { Link } from "react-router-dom"

const MyBuildTile = ({ id, title, thumbnailImage }) => {

  return (
    <Link to={`/my-builds/${id}`}>
      <div className="project-tile my-builds-tile">
        <div className="thumbnail-image-container">
          <img className="thumbnail-image" src={thumbnailImage} />
        </div>
        <h3>{title}</h3>
      </div>
    </Link>
  )
}

export default MyBuildTile
