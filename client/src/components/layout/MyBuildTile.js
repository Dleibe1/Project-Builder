import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import ProjectForksButton from "./ProjectForksButton"

const MyBuildTile = ({ id, title, thumbnailImage }) => {
  const [hasForks, setHasForks] = useState(false)
  const history = useHistory()

  const checkForForks = async () => {
    try {
      const response = await fetch(`/api/v1/project-forks/fork-list/${id}`)
      if (!response.ok) {
        const newError = new Error("Error in the fetch!")
        throw newError
      }
      const responseBody = await response.json()
      if (responseBody.forks.length) {
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
      <div className="thumbnail-image-container">
        <img className="thumbnail-image" src={thumbnailImage} alt={`${title} thumbnail`} />
      </div>
      <h3>{title}</h3>
      {hasForks ? (
        <div
          className="button-container see-forked-versions-button"
          onClick={(e) => e.stopPropagation()}
        >
          <ProjectForksButton id={id} />
        </div>
      ) : null}
    </div>
  )
}

export default MyBuildTile
