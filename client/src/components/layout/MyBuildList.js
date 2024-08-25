import React, { useState, useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"
import { Pagination } from "@mui/material"
import MyBuildTile from "./MyBuildTile"

const MyBuildList = ({ projectsPerPage }) => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const pageNumberURLParam = searchParams.get("page")
  const [myBuilds, setMyBuilds] = useState([])
  const [projectCount, setProjectCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumberURLParam || 1))

  const history = useHistory()
  const totalPages = Math.ceil(projectCount / projectsPerPage)

  const getMyBuilds = async () => {
    try {
      const response = await fetch(`/api/v1/my-builds?page=${currentPage}&limit=${projectsPerPage}`)
      if (!response.ok) {
        const newError = new Error("Error in the fetch!")
        throw newError
      }
      const responseBody = await response.json()
      setMyBuilds(responseBody.userBuilds)
      setProjectCount(responseBody.userBuildCount)
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
    getMyBuilds()
    window.scrollTo({ top: 0 })
  }, [currentPage])

  const handlePaginationChange = (event, selectedPage) => {
    setCurrentPage(selectedPage)
    history.push(`/my-builds-list?page=${selectedPage}`)
  }

  const myBuildsArray = myBuilds.map((myBuild) => {
    return (
      <MyBuildTile
        key={myBuild.id}
        id={myBuild.id}
        title={myBuild.title}
        thumbnailImage={myBuild.thumbnailImage}
      />
    )
  })

  return (
    <div className="grid-container project-list-page-container">
      <div className="project-list">{myBuildsArray}</div>
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

export default MyBuildList
