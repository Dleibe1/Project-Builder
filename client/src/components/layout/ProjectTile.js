import React from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

const ProjectTile = ({ title, createdBy, id }) => {
  const locationData = useLocation()
  const myBuilds = locationData.pathname === "/my-builds" ? true : false

  return (
    <Link to={`/projects/${id}`}>
      <div className="cell small-3 medium-6 large-4 project-tile">
        <h3>{title}</h3>
        <h4>Created By:</h4>
        <h5>{createdBy}</h5>
      </div>
    </Link>
  )
}

export default ProjectTile
