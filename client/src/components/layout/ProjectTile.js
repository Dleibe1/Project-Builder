import React, { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import ProjectForksButton from "./ProjectForksButton"

const ProjectTile = ({ title, createdBy, thumbnailImage, id }) => {
  const [hasForks, setHasForks] = useState(false)

  const checkForForks = async () => {
    try {
      const response = await fetch(`/api/v1/project-forks/${id}/fork-list`)
      if (!response.ok) {
        const newError = new Error("Error in the fetch!")
        throw newError
      }
      const responseBody = await response.json()
      console.log(responseBody.forks)
      if (responseBody.forks.length) {
        setHasForks(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    checkForForks()
  }, [])

  return (
    <Link to={`/projects/${id}`}>
      <div className="cell small-12 medium-6 large-4 project-tile">
        <div className="thumbnail-image-container">
          <img className="thumbnail-image" src={thumbnailImage} alt={`${title} thumbnail`} />
        </div>
        <h3>{title}</h3>
        <h4>Created By:</h4>
        <h5>{createdBy}</h5>
        {hasForks ? <div className="button-container"><ProjectForksButton id={id} /></div>: []}
      </div>
    </Link>
  )
}

export default ProjectTile
