import React from "react"
import { Link } from "react-router-dom"

const MyBuildTile = ({ id, title }) => {
  const titleNoWhiteSpace = title.replace(/\s/g, "");

  return (
    <Link to={`/my-builds/${id}/${titleNoWhiteSpace}`}>
      <div className="cell small-3 medium-6 large-4 project-tile">
        <h3>{title}</h3>
      </div>
    </Link>
  )
}

export default MyBuildTile
