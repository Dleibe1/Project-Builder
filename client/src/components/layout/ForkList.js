import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ProjectTile from "./ProjectTile"

const ForkList = (props) => {
  const params = useParams()
  const { id } = params
  const [forks, setForks] = useState([])
  const getForks = async () => {
    try {
      const response = await fetch(`/api/v1/project-forks/${id}/fork-list`)
      if (!response.ok) {
        const newError = new Error("Error in the fetch!")
        throw newError
      }
      const responseBody = await response.json()
      setForks(responseBody.forks)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getForks()
  }, [])

  console.log(forks)

  const forksArray = forks.map((fork) => {
    if (fork.id !== id) {
      return (
        <ProjectTile
        key={fork.id}
        id={fork.id}
        title={fork.title}
        createdBy={fork.user}
        thumbnailImage={fork.thumbnailImageURL}
        />
      )
    }
  })
  return (
    <div>
      <div className="grid-container">
        <div className="grid-x grid-margin-x project-list">{forksArray}</div>
      </div>
    </div>
  )
}

export default ForkList
