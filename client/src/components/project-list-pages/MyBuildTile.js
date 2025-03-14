import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import ProjectForksButton from "../shared/SeeForkedVersionsButton"

const MyBuildTile = ({ id, title, thumbnailImage, createdBy }) => {
  const [hasForks, setHasForks] = useState(false)
  const history = useHistory()

  const checkForForks = async () => {
    try {
      const response = await fetch(`/api/v1/projects/check-for-forks/${id}`)
      if (!response.ok) {
        const newError = new Error("Error in the fetch!")
        throw newError
      }
      const responseBody = await response.json()
      if (responseBody.aForkExists) {
        setHasForks(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleTileClick = () => {
    history.push(`/my-builds/${id}`)
  }

  useEffect(() => {
    checkForForks()
  }, [])

  return (
    <div className="project-tile" onClick={handleTileClick}>
    <img className="thumbnail-image" src={thumbnailImage} alt={`${title} thumbnail`} />
    <div className="project-tile-info-container">
      <h3 className={hasForks ? `project-tile-title has-forks` : "" }>{title}</h3>
      <div className="project-tile-username-info">
        <h4>By:</h4>
        <h5 className="username">{createdBy}</h5>
      </div>
      {hasForks ? (
        <ProjectForksButton id={id} className="button-container see-forked-versions-button" />
      ) : null}
    </div>
  </div>
  )
}

export default MyBuildTile
