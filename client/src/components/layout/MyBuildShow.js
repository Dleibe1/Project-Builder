import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import DeleteBuildButton from "./DeleteBuildButton"
import EditBuildButton from "./EditBuildButton"

import hljs from "highlight.js"
import "highlight.js/styles/github.css"

const MyBuildShow = (props) => {
  const [myBuild, setMyBuild] = useState({
    title: "",
    tags: "",
    appsAndPlatforms: "",
    images: [],
    parts: [],
    description: "",
    code: "",
    githubFileURL: "",
    userId: "",
    thumbnailImageURL: "",
  })
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
      let build = responseBody.userBuild
      for (let [key, value] of Object.entries(build)) {
        if (value === null) {
          build[key] = '';
        }
      }
      setMyBuild(build)
    } catch (error) {
      console.log(error)
    }
  }

  const codeMessage = myBuild.githubFileURL.length ? `Code fetched just now from GitHub: (${myBuild.githubFileURL}) ` : "Code:"
  const partsList = myBuild.parts.map((part) => {
    return <p>{part}</p>
  })

  const imageList = myBuild.images.map((image) => {
    return <img className="project-image" src={`${image}`} />
  })

  return (
    <div className="project-show">
      <div className="button-container">
        <div className="button-container">
          <EditBuildButton id={id} />
          <DeleteBuildButton id={id} />
        </div>
      </div>
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
      <div className="images-container">{imageList}</div>
      <p className="github-url" >{codeMessage}</p>
      <pre>
        <code ref={codeRef} className="language-c">
          {myBuild.code}
        </code>
      </pre>
    </div>
  )
}

export default MyBuildShow
