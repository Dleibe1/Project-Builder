import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProjectTile from "./ProjectTile"

const ProjectList = (props) => {
  const [projects, setProjects] = useState([])

  const getProjectsData = async () => {
    try {
      const response = await fetch("/api/v1/projects")
      if (!response.ok) {
        const newError = new Error("Error in the fetch!")
        throw newError
      }
      const responseBody = await response.json()
      setProjects(responseBody.projects)
    } catch (err) {
      console.log(err)
    }
  }

  const projectsArray = projects.map((project) => {
    return <ProjectTile id={project.id} title={project.title} createdBy={project.user} />
  })

  useEffect(() => {
    getProjectsData()
  }, [])

  return (
    <div>
      <div className="new-build-container">
      </div>
      <div className="grid-container">
        <div className="grid-x grid-margin-x project-list">{projectsArray}</div>
      </div>
    </div>
  )
}

export default ProjectList
