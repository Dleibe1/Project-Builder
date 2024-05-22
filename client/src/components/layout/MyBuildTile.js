import React from "react"
import { Link } from "react-router-dom"

const MyBuildTile = ({ id, title, thumbnailImage }) => {
  const titleNoWhiteSpace = title.replace(/\s/g, "")

  return (
    <Link to={`/my-builds/${id}`}>
      <div className="cell small-3 medium-6 large-4 project-tile">
        <img id="thumbnail-image" src={thumbnailImage} />
        <h3>{title}</h3>
      </div>
    </Link>
  )
}

export default MyBuildTile
