import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import ProjectTile from "./ProjectTile"
import { Pagination } from "@mui/material"

const ProjectList = (props) => {
  const [projects, setProjects] = useState([])
  const [projectCount, setProjectCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber || 1))

  const history = useHistory()
  const { pageNumber } = useParams()
  const projectsPerPage = 6
  const totalPages = Math.ceil(projectCount / projectsPerPage)
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
    if (pageNumber && parseInt(pageNumber) !== currentPage) {
      setCurrentPage(parseInt(pageNumber))
    }
  }, [pageNumber])

  useEffect(() => {
    getProjectsData()
    window.scrollTo({ top: 0 })
  }, [currentPage])

  const handlePagninationChange = (event, selectedPage) => {
    setCurrentPage(selectedPage)
    history.push(`/project-list/${selectedPage}`)
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
    <div className="grid-container project-list-page-container">
      <div className="project-list">{projectsArray}</div>
      <div className="project-list-pagination-container">
        <Pagination
          page={currentPage}
          onChange={handlePagninationChange}
          color={"primary"}
          size={"large"}
          sx={{
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