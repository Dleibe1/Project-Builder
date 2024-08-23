import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useSearch } from "../contexts/SearchContext"
import ProjectTile from "./ProjectTile"
import { Pagination } from "@mui/material"

const SearchList = ({ projectsPerPage }) => {
  const { searchResults, setSearchResults } = useSearch()
  const [projectCount, setProjectCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber || 1))
  const [query, setQuery] = useState("")

  const history = useHistory()
  const { addressBarSearchTerm, pageNumber } = useParams()
  const totalPages = Math.ceil(projectCount / projectsPerPage)

  useEffect(() => {
    setQuery(addressBarSearchTerm)
    window.scrollTo({ top: 0 })
  }, [addressBarSearchTerm])

  useEffect(() => {
    executeSearch(query)
    window.scrollTo({ top: 0 })
  }, [query, currentPage])

  useEffect(() => {
    if (pageNumber && parseInt(pageNumber) !== currentPage) {
      setCurrentPage(parseInt(pageNumber))
    }
  }, [pageNumber])

  console.log(projectCount, " ", searchResults)

  const executeSearch = async (searchQuery) => {
    try {
      const response = await fetch(
        `/api/v1/search/${searchQuery}/${currentPage}/${projectsPerPage}`,
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
    history.push(`/search/${query}/${selectedPage}`)
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
