import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSearch } from "../contexts/SearchContext"
import ProjectTile from "./ProjectTile"
import { Pagination } from "@mui/material"

const SearchList = ({ projectsPerPage }) => {
  const { searchResults } = useSearch()
  const [projects, setProjects] = useState(searchResults)
  const [projectCount, setProjectCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber || 1))
  const [query, setQuery] = useState

  const history = useHistory()
  const { searchTerm, pageNumber } = useParams()
  const totalPages = Math.ceil(projectCount / projectsPerPage)

  useEffect(() => {
    if (searchTerm) {
    }
  })
}

export default SearchList
