import React, { useState, useEffect } from "react"
import ProjectTile from "./ProjectTile"
import { Pagination } from "@mui/material"

const ProjectList = (props) => {
  const [projects, setProjects] = useState([])
  const [projectCount, setProjectCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const projectsPerPage = 9
  const getProjectsData = async () => {
    try {
      const response = await fetch(`/api/v1/projects/page/${currentPage}/${projectsPerPage}`)
      if (!response.ok) {
        const newError = new Error("Error in the fetch!")
        throw newError
      }
      const responseBody = await response.json()
      setProjects(responseBody.projects)
      setProjectCount(responseBody.projectCount)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProjectsData()
  }, [currentPage])

  const totalPages = Math.ceil(projectCount / projectsPerPage)
  const handlePagninationChange = (event, pageNumber ) => {
    setCurrentPage(pageNumber)
  }

  const projectsArray = projects.map((project, index) => {
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
      <div className="project-list">{projectsArray}</div>
      <div className="project-list-pagination-container">
        <Pagination
          onChange={handlePagninationChange}
          color={"primary"}
          size={"large"}
          sx={{
            "& .MuiPaginationItem-root": {
              fontSize: "2rem",
              padding: "25px",
            },
            "& .MuiPagination-ul": {
              justifyContent: "center",
            },
          }}
          count={totalPages}
        ></Pagination>
      </div>
    </div>
  )
}

export default ProjectList
