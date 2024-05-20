import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"

const MyBuildShow = (props) => {
  const [myBuild, setMyBuild] = useState({ parts: [] })
  const params = useParams()
  const { id } = params
  const codeRef = useRef(null)

  useEffect(() => {
    getMyBuild()
  }, [])

  useEffect(() => {
    if (codeRef.current) {
      if (codeRef.current.dataset.highlighted) {
        delete codeRef.current.dataset.highlighted
      }
      hljs.highlightElement(codeRef.current)
    }
  }, [myBuild])
  
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

  const partsList = myBuild.parts.map((part) => {
    return <p>{part.partName}</p>
  })

  return (
    <div className="project-show">
      <div id="show-page-thumbnail">
        <img src={myBuild.thumbnailImageURL} />
      </div>
      <h1>{myBuild.title}</h1>
      <p>{myBuild.description}</p>
      <h4>Parts:</h4>
      {partsList}
      <h4>Apps and Platforms:</h4>
      <p>{myBuild.appsAndPlatforms}</p>
      <h4>Tags:</h4>
      <p>{myBuild.tags}</p>
      <h4>Code:</h4>
      <pre>
        <code ref={codeRef} className="language-c">
          {project.code}
        </code>
      </pre>
    </div>
  )
}

export default MyBuildShow
