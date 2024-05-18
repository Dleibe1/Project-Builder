import React from "react"
import { Link } from "react-router-dom"

const MyBuildsTile = ({ id, title }) => {
  const titleNoWhiteSpace = title.replace(/\s/g, "");

  return (
    <Link to={`/my-builds/${titleNoWhiteSpace}`}>
      <div className="cell small-3 medium-6 large-4 project-tile">
        <h3>{title}</h3>
      </div>
    </Link>
  )
}

export default MyBuildsTile
