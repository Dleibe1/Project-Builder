import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import ForkBuildButton from "./ForkBuildButton"
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
      for (let [key, value] of Object.entries(project)) {
        if (value === null) {
          project[key] = ""
        }
      }
      setProject(project)
    } catch (error) {
      console.log(error)
    }
  }
  const editBuildButton = [<ForkBuildButton id={id} />]
  const codeMessage = project.githubFileURL.length ? `Code fetched just now from GitHub: (${project.githubFileURL}) ` : "Code:" 
  const partsList = project.parts.map((part) => {
    return <p>{part.partName}</p>
  })
  const imageList = project.images.map((image) => {
    return <img className="project-image" src={`${image.imageURL}`} />
  })

  return (
    <div className="project-show">
      {props.user ? editBuildButton : []}
      <h1>{project.title}</h1>
      <div id="show-page-thumbnail">
        <img src={project.thumbnailImageURL} />
      </div>
      <p>{project.description}</p>
      <h4>Parts:</h4>
      {partsList}
      <h4>Apps and Platforms:</h4>
      <p>{project.appsAndPlatforms}</p>
      <h4>Tags:</h4>
      <p>{project.tags}</p>
      <div className="images-container">{imageList}</div>
      <p className="github-url" >{codeMessage}</p>
      <pre>
        <code ref={codeRef} className="language-c">
          {project.code}
        </code>
      </pre>
    </div>
  )
}

export default ProjectShow
