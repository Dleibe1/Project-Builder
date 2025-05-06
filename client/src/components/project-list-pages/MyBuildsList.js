import React, { useState, useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"
import { Pagination } from "@mui/material"
import MyBuildTile from "./MyBuildTile"
import getMyBuildsList from "../../api/getMyBuildsList"

const MyBuildList = ({ projectsPerPage }) => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const pageNumberURLParam = searchParams.get("page")
  const [userBuilds, setUserBuilds] = useState([])
  const [userBuildsCount, setUserBuildsCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumberURLParam || 1))

  const history = useHistory()
  const totalPages = Math.ceil(userBuildsCount / projectsPerPage)

  useEffect(() => {
    if (pageNumberURLParam && parseInt(pageNumberURLParam) !== currentPage) {
      setCurrentPage(parseInt(pageNumberURLParam))
    }
  }, [pageNumberURLParam])

  useEffect(() => {
    getMyBuildsList(currentPage, projectsPerPage).then(([userBuilds, userBuildsCount]) => {
      setUserBuilds(userBuilds)
      setUserBuildsCount(userBuildsCount)
    })
  }, [currentPage])

  const handlePaginationChange = (event, selectedPage) => {
    history.push(`/my-builds-list?page=${selectedPage}`)
    setCurrentPage(selectedPage)
  }

  const myBuilds = userBuilds.map((userBuild) => {
    return (
      <MyBuildTile
        key={userBuild.id}
        id={userBuild.id}
        title={userBuild.title}
        createdBy={userBuild.user}
        thumbnailImage={userBuild.thumbnailImage}
      />
    )
  })

  return (
    <div className="grid-container project-list-page-container">
      <div className="project-list">{myBuilds}</div>
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
