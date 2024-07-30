import React, { useState, useEffect } from "react"
import ProjectTile from "./ProjectTile"
import LandingPage from "./LandingPage"

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

  useEffect(() => {
    getProjectsData()
  }, [])

  const projectsArray = projects.map((project) => {
    if (project.id === project.parentProjectId) {
      return (
        <ProjectTile
          key={project.id}
          id={project.id}
          title={project.title}
          createdBy={project.user}
          thumbnailImage={project.thumbnailImage}
        />
      )
    }
  })

  return (
      <div className="grid-container">
        <div className="grid-x grid-margin-x project-list">{projectsArray}</div>
      </div>
  )
}

export default ProjectList
