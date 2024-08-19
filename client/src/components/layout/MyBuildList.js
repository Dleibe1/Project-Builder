import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { Pagination } from "@mui/material"
import MyBuildTile from "./MyBuildTile"

const MyBuildList = (props) => {
  const [myBuilds, setMyBuilds] = useState([])
  const [projectCount, setProjectCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber || 1))

  const history = useHistory()
  const { pageNumber } = useParams()
  const projectsPerPage = 6
  const totalPages = Math.ceil(projectCount / projectsPerPage)
  const getMyBuilds = async () => {
    try {
      const response = await fetch(`/api/v1/my-builds/page/${currentPage}/${projectsPerPage}`)
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
    if (pageNumber && parseInt(pageNumber) !== currentPage) {
      setCurrentPage(parseInt(pageNumber))
    }
  }, [pageNumber])

  useEffect(() => {
    getMyBuilds()
    window.scrollTo({ top: 0 })
  }, [currentPage])

  const handlePagninationChange = (event, selectedPage) => {
    setCurrentPage(selectedPage)
    history.push(`/my-builds-list/${selectedPage}`)
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

export default MyBuildList
