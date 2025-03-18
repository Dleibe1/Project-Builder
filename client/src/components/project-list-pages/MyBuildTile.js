import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import TileSeeForksButton from "./TileSeeForksButton"
import doesProjectHaveForks from "../../api/doesProjectHaveForks"

const MyBuildTile = ({ id, title, thumbnailImage, createdBy }) => {
  const [hasForks, setHasForks] = useState(false)
  const history = useHistory()

  const handleTileClick = () => {
    history.push(`/my-builds/${id}`)
  }

  useEffect(() => {
    const fetchCheckForForks = async () => {
      try {
        const hasForks = await doesProjectHaveForks(id)
        setHasForks(hasForks)
      } catch (error) {
        console.error("Error in checkForForks Fetch: ", error)
      }
    }
    fetchCheckForForks()
  }, [])

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

export default MyBuildTile
