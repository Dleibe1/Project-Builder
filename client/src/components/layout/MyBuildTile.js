import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import ProjectForksButton from "./ProjectForksButton"

const MyBuildTile = ({ id, title, thumbnailImage }) => {
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
    <div className="project-tile my-builds-tile" onClick={handleTileClick}>
      <img className="thumbnail-image" src={thumbnailImage} alt={`${title} thumbnail`} />
      <h3>{title}</h3>
      <div className="my-builds-forks-button">{hasForks ? <ProjectForksButton id={id} /> : null}</div>
    </div>
  )
}

export default MyBuildTile
