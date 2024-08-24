import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useSearch } from "../contexts/SearchContext"
import ProjectTile from "./ProjectTile"
import { Pagination } from "@mui/material"

const SearchList = ({ projectsPerPage }) => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const pageNumberURLParam = params.get("page")
  const queryURLParam = params.get("q")

  const { searchResults, setSearchResults } = useSearch()
  const [projectCount, setProjectCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumberURLParam || 1))
  const [query, setQuery] = useState(queryURLParam.trim() || "")

  const history = useHistory()
  const totalPages = Math.ceil(projectCount / projectsPerPage)

  useEffect(() => {
    const newPage = parseInt(pageNumberURLParam || 1)
    if (newPage && parseInt(newPage) !== currentPage) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0 })
    }
  }, [pageNumberURLParam])

  useEffect(() => {
    const newQuery = queryURLParam ? queryURLParam.trim() : ""
    if (newQuery !== query) {
      setQuery(newQuery)
      window.scrollTo({ top: 0 })
    }
  }, [queryURLParam])

  useEffect(() => {
    executeSearch(query)
    window.scrollTo({ top: 0 })
  }, [query, currentPage])

  const executeSearch = async (searchQuery) => {
    try {
      const response = await fetch(
        `/api/v1/search?q=${searchQuery}&page=${currentPage}&limit=${projectsPerPage}`,
      )
      if (!response.ok) {
        const newError = new Error("Error in the fetch!")
        throw newError
      }
      const responseBody = await response.json()
      setSearchResults(responseBody.projects)
      setProjectCount(responseBody.projectCount)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePagninationChange = (event, selectedPage) => {
    setCurrentPage(selectedPage)
    history.push(`/search?q=${query}&page=${selectedPage}`)
  }

  const projectsArray = searchResults.map((project, index) => {
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
