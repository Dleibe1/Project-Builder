import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSearch } from "../contexts/SearchContext"
import ProjectTile from "./ProjectTile"
import { Pagination } from "@mui/material"

const SearchList = ({ projectsPerPage }) => {
  const { searchResults } = useSearch()
  const [projects, setProjects] = useState([])
  const [projectCount, setProjectCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber || 1))
  const [query, setQuery] = useState("")

  const history = useHistory()
  const { searchTerm, pageNumber } = useParams()
  const totalPages = Math.ceil(projectCount / projectsPerPage)

  useEffect(() => {
    if (searchTerm) {
      setQuery(searchTerm)
    }
  }, [searchTerm])

  console.log(searchTerm)

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

export default SearchList
