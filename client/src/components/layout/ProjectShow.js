import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import ForkProjectButton from "./ForkProjectButton.js"
import ProjectForksButton from "./ProjectForksButton.js"
import prepForFrontEnd from "../../services/prepForFrontEnd.js"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"

const ProjectShow = (props) => {
  const [project, setProject] = useState({
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
    getProject()
  }, [])

  useEffect(() => {
    if (codeRef.current) {
      if (codeRef.current.dataset.highlighted) {
        delete codeRef.current.dataset.highlighted
      }
      hljs.highlightElement(codeRef.current)
    }
  }, [project])

  const getProject = async () => {
    try {
      const response = await fetch(`/api/v1/projects/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      let project = responseBody.project
      prepForFrontEnd(project)
      setProject(project)
    } catch (error) {
      console.log(error)
    }
  }

  const forkProjectButton = [<ForkProjectButton key={id} id={id} />]
  const codeMessage = project.githubFileURL.length
    ? `Code fetched from GitHub just now: (${project.githubFileURL}) `
    : "Code:"
  const partsList = project.parts.map((part) => {
    return <p key={part.partName}>{part.partName}</p>
  })
  const imageList = project.images.map((image) => {
    return <img className="project-image" src={`${image.imageURL}`} />
  })

  return (
    <div className="project-show">
      <div>
        {props.user ? forkProjectButton : []}
        <ProjectForksButton id={id} />
      </div>
      <h2>{project.title}</h2>
      <div className="images-container">
        <img className="project-image" src={project.thumbnailImageURL} alt="thumbnail" />
      </div>
      <div className="showpage-items-container">
        <h4>Description and Instructions:</h4>
        <p>{project.description}</p>
      </div>
      <div className="showpage-items-container">
        <h4>Parts:</h4>
        <div className="parts-list">{partsList}</div>
      </div>
      <div className="showpage-items-container">
        <h4>Apps and Platforms:</h4>
        <div>{project.appsAndPlatforms}</div>
      </div>
      <div id="project-images">
        <h4>Project Images</h4>
      </div>
      <div className="images-container">{imageList}</div>
      <h6 className="github-url">{codeMessage}</h6>
      <pre>
        <code ref={codeRef} className="language-c">
          {project.code}
        </code>
      </pre>
    </div>
  )
}

export default ProjectShow
