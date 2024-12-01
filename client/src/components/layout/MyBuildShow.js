import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import DeleteBuildButton from "./DeleteBuildButton"
import EditBuildButton from "./EditBuildButton"
import prepForFrontEnd from "../../services/prepForFrontEnd.js"
//TODO: remove all "prepForFrontEnd" and replace with functional state update as done in ForkedProjectForm
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

  useEffect(() => {
    getMyBuild()
  }, [])

  useEffect(() => {
    //Apply highlighting after default css has been applied
    const codeTags = document.querySelectorAll('code');
    codeTags.forEach(tag => {
      delete tag.dataset.highlighted
    })
    hljs.highlightAll()
  }, [myBuild])

  useEffect(() => {
    document.body.classList.add("grey-background")
    return () => {
      document.body.classList.remove("grey-background")
    }
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
      const build = responseBody.userBuild
      setMyBuild((prevState) => ({ ...prevState, ...build }))
    } catch (error) {
      console.log(error)
    }
  }

  const codeMessage = myBuild.githubFileURL?.length ? (
    [<h2>Code fetched from GitHub just now:</h2>, <p>({myBuild.githubFileURL})</p>]
  ) : (
    <h2>Project Code</h2>
  )
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
          {codeMessage}
          <pre>
            <code className="language-cpp">{myBuild.code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default MyBuildShow
