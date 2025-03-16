import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ForkProjectButton from "./show-page-authed-UI/ForkProjectButton.js"
import SeeForkedVersionsButton from "../shared/SeeForkedVersionsButton.js"
import DiffViewButton from "./show-pages-shared/DiffViewButton.js"
import TagList from "./show-pages-shared/TagList.js"
import Instructions from "../shared/Instructions.js"
import prepForFrontEnd from "../../services/prepForFrontEnd.js"
import DOMPurify from "dompurify"

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
    parentProjectId: "",
  })
  const [hasForks, setHasForks] = useState(false)
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

  const forkProjectButton = [<ForkProjectButton id={id} />]
  const codeMessage = project.githubFileURL?.length ? (
    [
      <h2 className="code-fetched-heading">Code fetched from GitHub just now:</h2>,
      <p>{project.githubFileURL}</p>,
    ]
  ) : (
    <h2>Project Code</h2>
  )
  const partsList = project.parts.map((part, index) => {
    return (
      <div
        className="part-item-in-showpage"
        key={`${(part.partName, part.partPurchaseURL)}${index}`}
      >
        {part.partPurchaseURL.length === 0 && (
          <p className="part-without-purchase-link">{part.partName}</p>
        )}
        {part.partPurchaseURL.length > 0 && (
          <a href={part.partPurchaseURL}>
            <div className="part-with-purchase-link">
              <p>{part.partName} </p>
              <ShoppingCartIcon fontSize="large" />
            </div>
          </a>
        )}
      </div>
    )
  })

  return (
    <div className="project-show">
      <div className="project-show-top-buttons">
        {props.user ? forkProjectButton : []}
        {hasForks ? <SeeForkedVersionsButton id={id} /> : []}
        {project.parentProjectId.length > 0 && (
          <DiffViewButton parentProjectId={project.parentProjectId} forkedProjectId={project.id} />
        )}
      </div>
      {project.tags.length > 0 && (
        <div className="showpage-items-container tag-list">
          <section className="tag-section">
            <p>Tags:</p>
            <TagList tags={project.tags} />
          </section>
        </div>
      )}
      <section id="thumbnail-and-title">
        <h2 className="showpage-title">{project.title}</h2>
        <img
          className="project-image show-page-thumbnail"
          src={project.thumbnailImage}
          alt="thumbnail"
        />
      </section>
      <div className="showpage-items-container description">
        <h2 className="description-title">Description</h2>
        <p className="preserve-white-space">{project.description}</p>
      </div>
      <h2 id="parts-heading">Parts</h2>
      <div className="showpage-items-container parts-section">
        <section className="parts-list">{partsList}</section>
      </div>
      <div className="showpage-items-container">
        <h4>Apps and Platforms:</h4>
        <section className="apps-and-platforms">
          <p>{project.appsAndPlatforms}</p>
        </section>
      </div>
      <Instructions project={project} />
      <div>
        <section className="showpage-items-container">
          {codeMessage}
          <pre>
            <code
              className="language-cpp"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(project.code),
              }}
            ></code>
          </pre>
        </section>
      </div>
    </div>
  )
}

export default ProjectShow
