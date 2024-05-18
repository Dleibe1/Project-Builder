import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import ProjectTile from "./ProjectTile"
import MyBuildsTile from "./MyBuildsTile"

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

  const currentPathData = useLocation()
  const currentPath = currentPathData.pathname
  const myBuilds = currentPath === "/my-builds" ? true : false

  useEffect(() => {
    getProjectsData()
  }, [])
  const projectsArray = projects.map((project) => {
    if (myBuilds) {
      return <MyBuildsTile key={project.id} id={project.id} title={project.title} />
    } else {
      return <ProjectTile key={project.id} id={project.id} title={project.title} createdBy={project.user} />
    }
  })

  return (
    <div>
      <div className="grid-container">
        <div className="grid-x grid-margin-x project-list">{projectsArray}</div>
      </div>
    </div>
  )
}

export default ProjectList
