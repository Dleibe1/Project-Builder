import React from "react"
import { useHistory } from "react-router-dom"
import TileSeeForksButton from "./TileSeeForksButton"
import useCheckForProjectForks from "../../hooks/useCheckForProjectForks"

const ProjectTile = ({ title, createdBy, thumbnailImage, id }) => {
  const history = useHistory()
  const hasForks = useCheckForProjectForks(id)
  const handleTileClick = () => {
    history.push(`/projects/${id}`)
  }

  return (
    <div data-cy="project-tile-homepage" className="project-tile" onClick={handleTileClick}>
      <img className="thumbnail-image" src={thumbnailImage} alt={`${title} thumbnail`} />
      <div className="project-tile-info-container">
        <h3 className={hasForks ? `project-tile-title has-forks` : ""}>{title}</h3>
        <div className="project-tile-username-info">
          <h4>By:</h4>
          <h5 className="username">{createdBy}</h5>
        </div>
        {hasForks && (
          <TileSeeForksButton id={id} className="button-container see-forked-versions-button" />
        )}
      </div>
    </div>
  )
}

export default ProjectTile
