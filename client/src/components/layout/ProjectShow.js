import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const ProjectShow = (props) => {
  const [project, setProject] = useState({ parts: [] })
  const params = useParams()
  const projectId = params.id
  useEffect(() => {
    getProject()
  }, [])
  const getProject = async () => {
    try {
      const response = await fetch(`/api/v1/projects/${projectId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setProject(responseBody.project)
    } catch (error) {
      console.log(error)
    }
  }

  const partsList = project.parts.map(part => {
    return <p>{part.partName}</p> 
  })

  return (
    <div className="project-show">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <h4>Parts:</h4>
      {partsList}
      <h4>Apps and Platforms:</h4>
      <p>{project.appsAndPlatforms}</p>
      <h4>Tags:</h4>
      <p>{project.tags}</p>
      <h4>Code:</h4>
      <code>{project.code}</code>
    </div>
  )
}

export default ProjectShow
