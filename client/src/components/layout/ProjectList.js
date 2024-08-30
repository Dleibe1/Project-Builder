import React, { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import ProjectTile from "./ProjectTile"
import Tags from "./Tags"
import { Pagination } from "@mui/material"

const ProjectList = ({ projectsPerPage }) => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const pageNumberURLParam = searchParams.get("page")
  const [projects, setProjects] = useState([])
  const [projectCount, setProjectCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumberURLParam || 1))

  const history = useHistory()
  const totalPages = Math.ceil(projectCount / projectsPerPage)

  const getProjectsData = async () => {
    try {
      const response = await fetch(`/api/v1/projects/?page=${currentPage}&limit=${projectsPerPage}`)
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
    if (pageNumberURLParam && parseInt(pageNumberURLParam) !== currentPage) {
      setCurrentPage(parseInt(pageNumberURLParam))
    }
  }, [pageNumberURLParam])

  useEffect(() => {
    getProjectsData()
    window.scrollTo({ top: 0 })
  }, [currentPage])

  const handlePaginationChange = (event, selectedPage) => {
    history.push(`/project-list?page=${selectedPage}`)
    setCurrentPage(selectedPage)
  }

  const projectsArray = projects.map((project, index) => {
    if (!project.parentProjectId) {
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
      {/* <Tags/> */}
      <div className="project-list">{projectsArray}</div>
      <div className="project-list-pagination-container">
        <Pagination
          page={currentPage}
          onChange={handlePaginationChange}
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
