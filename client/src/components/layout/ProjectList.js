import React, { useState, useEffect, useContext } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { TagContext } from "../../contexts/TagContext"
import ProjectTile from "./ProjectTile"
import { Pagination } from "@mui/material"

const ProjectList = ({ projectsPerPage }) => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const pageNumberURLParam = searchParams.get("page")
  const tagURLParam = searchParams.get("tag")

  const [projects, setProjects] = useState([])
  const [projectCount, setProjectCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumberURLParam || 1))
<<<<<<< Updated upstream
  const { selectedTag, setSelectedTag } = useContext(TagContext)
=======
>>>>>>> Stashed changes

  const history = useHistory()
  const totalPages = Math.ceil(projectCount / projectsPerPage)

  const getProjectsData = async (queryParams) => {
    try {
      const response = await fetch(`/api/v1/projects/?limit=${projectsPerPage}&${queryParams}`)
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
  //TODO: Upgrade to react-router-dom 6 for useSearchParams to handle this in a simpler way with fewer re-renders
  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search)
    let shouldPush = false
    if (currentPage && currentPage >= 1 && newSearchParams.get("page") !== currentPage.toString()) {
      newSearchParams.set("page", currentPage)
      shouldPush = true
    }
    if (selectedTag && newSearchParams.get("tag") !== selectedTag) {
      newSearchParams.set("tag", selectedTag)
      newSearchParams.set("page", 1)
      shouldPush = true
    } else if (!selectedTag && newSearchParams.has("tag")) {
      newSearchParams.delete("tag")
      shouldPush = true
    }
    if (shouldPush) {
      history.push(`?${newSearchParams.toString()}`)
    }
    getProjectsData(newSearchParams.toString())
    window.scrollTo({ top: 0 })
  }, [currentPage, selectedTag])

  useEffect(() => {
    if (pageNumberURLParam && parseInt(pageNumberURLParam) !== currentPage) {
      setCurrentPage(parseInt(pageNumberURLParam))
    }
    if (tagURLParam && tagURLParam.trim() !== selectedTag) {
      setSelectedTag(tagURLParam.trim())
    }
  }, [location.search])

  const handlePaginationChange = (event, selectedPage) => {
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
