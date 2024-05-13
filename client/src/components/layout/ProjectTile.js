import React from "react"

const ProjectTile = ({title, createdBy}) => {

  return <div>
    <h3>{title}</h3>
    <h4>Created By:</h4>
    <h5>{createdBy}</h5>
  </div>
}

export default ProjectTile
