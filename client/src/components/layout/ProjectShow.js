import React, { useState, useEffect, useRef } from "react"
import { useParams, Redirect } from "react-router-dom"
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
    instructions: [],
    parts: [],
    description: "",
    code: "",
    githubFileURL: "",
    userId: "",
    thumbnailImage: "",
  })
  const [hasForks, setHasForks] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)
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

  useEffect(() => {
    document.body.classList.add("grey-background")

    return () => {
      document.body.classList.remove("grey-background")
    }
  }, [])

  const getProject = async () => {
    try {
      const response = await fetch(`/api/v1/projects/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      const project = responseBody.project
      if (project.userId === props.user?.id) {
        setShouldRedirect(true)
      }
      prepForFrontEnd(project)
      setProject(project)
    } catch (error) {
      console.log(error)
    }
  }

  const checkForForks = async () => {
    try {
      const response = await fetch(`/api/v1/project-forks/${id}/fork-list`)
      if (!response.ok) {
        const newError = new Error("Error in the fetch!")
        throw newError
      }
      const responseBody = await response.json()
      if (responseBody.forks.length) {
        setHasForks(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    checkForForks()
  }, [])

  if (shouldRedirect) {
    return <Redirect push to={`/my-builds/${id}`} />
  }

  const forkProjectButton = [<ForkProjectButton key={id} id={id} />]
  const codeMessage = project.githubFileURL.length
    ? `Code fetched from GitHub just now: (${project.githubFileURL}) `
    : "Code:"
  const partsList = project.parts.map((part) => {
    return <p key={part.partName}>{part.partName}</p>
  })
  const instructionList = project.instructions.map((instruction) => {
    if (instruction.imageURL.length) {
      return <img className="project-image" src={`${instruction.imageURL}`} />
    } else if (instruction.instructionText.length) {
      return <p>{instruction.instructionText}</p>
    }
  })

  return (
    <div className="project-show">
      <div className="fork-project-button-container">
        {props.user ? forkProjectButton : []}
        {hasForks ? <ProjectForksButton id={id} /> : []}
      </div>
      <div className="images-container">
        <img className="project-image" src={project.thumbnailImage} alt="thumbnail" />
      </div>
      <h2>{project.title}</h2>
      <div className="showpage-items-container description">
        <h4>Description</h4>
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
      <div className="images-container">{instructionList}</div>
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
