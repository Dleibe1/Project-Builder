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
      const build = responseBody.userBuild
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
      return (
        <div className="showpage-items-container">
          <img className="project-image" src={`${instruction.imageURL}`} />
        </div>
      )
    } else if (instruction.instructionText) {
      return (
        <div className="showpage-items-container">
          <p className="preserve-white-space instruction-text">{instruction.instructionText}</p>
        </div>
      )
    }
  })

  return (
    <div className="project-show">
      <div className="edit-delete-build-button-container">
        <EditBuildButton id={id} />
        <DeleteBuildButton id={id} />
      </div>
      <div id="thumbnail-and-title">
        <img
          className="project-image show-page-thumbnail"
          src={myBuild.thumbnailImage}
          alt="thumbnail"
        />
        <h2>{myBuild.title}</h2>
      </div>
      <div className="showpage-items-container description">
        <h2 className="description-title">Description</h2>
        <p className="preserve-white-space">{myBuild.description}</p>
      </div>
      <div>
        <h2>Parts</h2>
      </div>
      <div className="showpage-items-container parts-section">
        <div className="parts-list">{partsList}</div>
      </div>
      <div className="showpage-items-container">
        <h4>Apps and Platforms:</h4>
        <div className="apps-and-platforms">
          <p>{myBuild.appsAndPlatforms}</p>
        </div>
      </div>
      <div>
        <h2>Instructions</h2>
        {instructionList}
      </div>
      <div>
        <div className="showpage-items-container">
          <p className="github-url"> {codeMessage}</p>
          <pre>
            <code ref={codeRef} className="language-c">
              {myBuild.code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default MyBuildShow
