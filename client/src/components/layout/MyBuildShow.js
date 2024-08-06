import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import DeleteBuildButton from "./DeleteBuildButton"
import EditBuildButton from "./EditBuildButton"
import prepForFrontEnd from "../../services/prepForFrontEnd.js"

import hljs from "highlight.js"
import "highlight.js/styles/github.css"

const MyBuildShow = (props) => {
  const [myBuild, setMyBuild] = useState({
    title: "",
    tags: "",
    appsAndPlatforms: "",
    instructions: [],
    parts: [],
    description: "",
    code: "",
    githubFileURL: "",
    userId: "",
    thumbnailImage: "",
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
      console.log(build)
      prepForFrontEnd(build)
      setMyBuild(build)
    } catch (error) {
      console.log(error)
    }
  }

  const codeMessage = myBuild.githubFileURL.length
    ? `Code fetched from GitHub just now: (${myBuild.githubFileURL}) `
    : "Code:"
  const partsList = myBuild.parts.map((part) => {
    return <p>{part.partName}</p>
  })

  const instructionList = myBuild.instructions.map((instruction) => {
    if (instruction.imageURL) {
      return <img className="project-image" src={`${instruction.imageURL}`} />
    } else if (instruction.instructionText) {
      return <p>{instruction.instructionText}</p>
    }
  })

  return (
    <div className="project-show">
      <div className="edit-delete-build-button-container">
        <EditBuildButton id={id} />
        <DeleteBuildButton id={id} />
      </div>
      <div className="images-container">
        <img className="project-image" src={myBuild.thumbnailImage} alt="thumbnail" />
      </div>
      <h2>{myBuild.title}</h2>
      <div className="showpage-items-container description">
        <h4>Description:</h4>
        <p>{myBuild.description}</p>
      </div>
      <div className="showpage-items-container">
        <h4>Parts:</h4>
        <div className="parts-list">{partsList}</div>
      </div>
      <div className="showpage-items-container">
        <h4>Apps and Platforms:</h4>
        <div>{myBuild.appsAndPlatforms}</div>
      </div>
      <div className="images-container">{instructionList}</div>
      <h6 className="github-url">{codeMessage}</h6>
      <pre>
        <code ref={codeRef} className="language-c">
          {myBuild.code}
        </code>
      </pre>
    </div>
  )
}

export default MyBuildShow
