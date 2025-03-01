import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import DeleteBuildButton from "./show-page-authed-UI/DeleteBuildButton"
import EditBuildButton from "./show-page-authed-UI/EditBuildButton"
import TagList from "./show-pages-shared/TagList"
//TODO: remove all "prepForFrontEnd" and replace with functional state update as done in ForkedProjectForm
import Instructions from "./show-pages-shared/Instructions"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"

const MyBuildShow = (props) => {
  const [myBuild, setMyBuild] = useState({
    title: "",
    tags: [],
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
    const codeTags = document.querySelectorAll("code")
    codeTags.forEach((tag) => {
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
    [
      <h2 className="code-fetched-heading">Code fetched from GitHub just now:</h2>,
      <p>{myBuild.githubFileURL}</p>,
    ]
  ) : (
    <h2>Project Code</h2>
  )
  const partsList = myBuild.parts.map((part, index) => {
    return <p key={`${part.partName}${index}`} >{part.partName}</p>
  })

  return (
    <div className="project-show">
      <div className="edit-delete-build-button-container">
        <EditBuildButton id={id} />
        <DeleteBuildButton id={id} />
      </div>
      {myBuild.tags.length > 0 && (
        <div className="showpage-items-container tag-list">
          <section className="tag-section">
            <p>Tags:</p>
            <TagList tags={myBuild.tags} />
          </section>
        </div>
      )}
      <div id="thumbnail-and-title">
        <h2 className="showpage-title">{myBuild.title}</h2>
        <img
          className="project-image show-page-thumbnail"
          src={myBuild.thumbnailImage}
          alt="thumbnail"
        />
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
        <Instructions project={myBuild} />
      </div>
      <div>
        <div className="showpage-items-container">
          {codeMessage}
          <pre>
            <code className="language-cpp">
              {myBuild.code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default MyBuildShow
