import React, { useState, useEffect } from "react"
import MyBuildTile from "./MyBuildTile"

const MyBuildList = (props) => {
  const [myBuilds, setMyBuilds] = useState([])
  const getMyBuilds = async () => {
    try {
      const response = await fetch("/api/v1/my-builds")
      if (!response.ok) {
        const newError = new Error("Error in the fetch!")
        throw newError
      }
      const responseBody = await response.json()
      setMyBuilds(responseBody.userBuilds)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMyBuilds()
  }, [])

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
    <div>
      <div className="grid-container">
        <div className="project-list">{myBuildsArray}</div>
      </div>
    </div>
  )
}

export default MyBuildList
