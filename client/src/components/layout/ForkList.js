import React, { useState, useEffect } from "react"
import { useParams, useHistory, useLocation } from "react-router-dom"
import { Pagination } from "@mui/material"
import ProjectTile from "./ProjectTile"

const ForkList = ({ projectsPerPage }) => {
  const params = useParams()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const pageNumberURLParam = searchParams.get("page")
  const { id } = params

  const [forkedProjects, setForkedProjects] = useState([])
  const [projectCount, setProjectCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumberURLParam || 1))

  const history = useHistory()
  const totalPages = Math.ceil(projectCount / projectsPerPage)

  const getForks = async () => {
    try {
      const response = await fetch(
        `/api/v1/project-forks/fork-list/${id}?page=${currentPage}&limit=${projectsPerPage}`,
      )
      if (!response.ok) {
        const newError = new Error("Error in the fetch!")
        throw newError
      }
      const responseBody = await response.json()
      setForkedProjects(responseBody.forks)
      setProjectCount(responseBody.forkedProjectCount)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getForks()
  }, [currentPage, id])

  useEffect(() => {
    if (pageNumberURLParam && parseInt(pageNumberURLParam) !== currentPage) {
      setCurrentPage(parseInt(pageNumberURLParam))
    }
  }, [pageNumberURLParam])

  const handlePaginationChange = (event, selectedPage) => {
    setCurrentPage(selectedPage)
    history.push(`/project-forks/${id}?page=${selectedPage}&limit=${projectsPerPage}`)
  }

  const forksArray = forkedProjects.map((fork) => {
    return (
      <ProjectTile
        key={fork.id}
        id={fork.id}
        title={fork.title}
        createdBy={fork.user}
        thumbnailImage={fork.thumbnailImage}
      />
    )
  })

  return (
    <div className="grid-container project-list-page-container">
      <div className="project-list">{forksArray}</div>
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

export default ForkList
