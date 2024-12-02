import React, { useState, useEffect} from "react"
import { useParams, Redirect } from "react-router-dom"
import ForkProjectButton from "./ForkProjectButton.js"
import ProjectForksButton from "./ProjectForksButton.js"
import DOMPurify from "dompurify"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"
import prepForFrontEnd from "../../services/prepForFrontEnd.js"

const ProjectShow = (props) => {
  const [project, setProject] = useState({
    title: "",
    tags: "",
    appsAndPlatforms: "",
    instructions: [],
    parts: [],
    tags: [],
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

  useEffect(() => {
    getProject()
  }, [])

  useEffect(() => {
    document.body.classList.add("grey-background")
    return () => {
      document.body.classList.remove("grey-background")
    }
  }, [])

  useEffect(() => {
    //Apply highlighting after default css has been applied
    const codeTags = document.querySelectorAll("code")
    codeTags.forEach((tag) => {
      delete tag.dataset.highlighted
    })
    hljs.highlightAll()
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
      const response = await fetch(`/api/v1/projects/check-for-forks/${id}`)
      if (!response.ok) {
        const newError = new Error("Error in the fetch!")
        throw newError
      }
      const responseBody = await response.json()
      if (responseBody.aForkExists) {
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

  const forkProjectButton = [<ForkProjectButton key={"fork-project"} id={id} />]
  const codeMessage = project.githubFileURL?.length ? (
    [<h2>Code fetched from GitHub just now:</h2>, <p>project.githubFileURL</p>]
  ) : (
    <h2>Project Code</h2>
  )
  const partsList = project.parts.map((part) => {
    return <p>{part.partName}</p>
  })
  const instructionList = project.instructions.map((instruction) => {
    if (instruction.imageURL) {
      return (
        <div className="showpage-items-container">
          <img className="project-image" src={`${instruction.imageURL}`} />
        </div>
      )
    } else if (instruction.instructionText) {
      return (
        <div
          className="preserve-white-space instruction-text showpage-items-container"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(instruction.instructionText) }}
        ></div>
      )
    }
  })

  return (
    <div className="project-show">
      <div className="fork-project-button-container">
        {props.user ? forkProjectButton : []}
        {hasForks ? <ProjectForksButton id={id} /> : []}
      </div>
      <div id="thumbnail-and-title">
        <h2 className="showpage-title">{project.title}</h2>
        <img
          className="project-image show-page-thumbnail"
          src={project.thumbnailImage}
          alt="thumbnail"
        />
      </div>
      <div className="showpage-items-container description">
        <h2 className="description-title">Description</h2>
        <p className="preserve-white-space">{project.description}</p>
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
          <p>{project.appsAndPlatforms}</p>
        </div>
      </div>
      <h2 className="instructions-heading">Instructions</h2>
      {instructionList}
      <div>
        <div className="showpage-items-container">
          {codeMessage}
          <pre>
            <code className="language-cpp">
              {project.code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default ProjectShow