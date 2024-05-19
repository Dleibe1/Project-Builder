import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

const MyBuildShow = (props) => {
  const [myBuild, setMyBuild] = useState({ parts: [] })
  const params = useParams()
  const { id } = params
  console.log(id)
  useEffect(() => {
    getMyBuild()
  }, [])
  const getMyBuild = async () => {
  try {
      const response = await fetch(`/api/v1/my-builds/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setMyBuild(responseBody.userBuild)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(myBuild)

  const partsList = myBuild.parts.map((part) => {
    return <p>{part.partName}</p>
  })

  return (
    <div className="project-show">
      <h1>{myBuild.title}</h1>
      <p>{myBuild.description}</p>
      <h4>Parts:</h4>
      {partsList}
      <h4>Apps and Platforms:</h4>
      <p>{myBuild.appsAndPlatforms}</p>
      <h4>Tags:</h4>
      <p>{myBuild.tags}</p>
      <h4>Code:</h4>
      <code>{myBuild.code}</code>
    </div>
  )
}

export default MyBuildShow
