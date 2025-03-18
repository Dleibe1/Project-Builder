import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import TileSeeForksButton from "./TileSeeForksButton"
import doesProjectHaveForks from "../../api/doesProjectHaveForks"

const ProjectTile = ({ title, createdBy, thumbnailImage, id }) => {
  const [hasForks, setHasForks] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const fetchHasForks = async () => {
      try {
        const hasForks = await doesProjectHaveForks(id)
        setHasForks(hasForks)
      } catch (error) {
        console.error("Error in doesProjectHaveForks()", error)
      }
    }
    fetchHasForks()
  }, [])

  const handleTileClick = () => {
    history.push(`/projects/${id}`)
  }

  return (
    <div className="project-tile" onClick={handleTileClick}>
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
