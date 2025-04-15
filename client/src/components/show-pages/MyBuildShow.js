import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import DeleteBuildButton from "./show-page-authed-UI/DeleteBuildButton"
import EditBuildButton from "./show-page-authed-UI/EditBuildButton"
import SeeForkedVersionsButton from "./show-pages-shared/SeeForkedVersionsButton.js"
import DiffViewButton from "./show-pages-shared/DiffViewButton.js"
import TagList from "./show-pages-shared/TagList"
import prepForFrontEnd from "../../services/prepForFrontEnd.js"
import getMyBuild from "../../api/getMyBuild.js"
import useDoForksExist from "../../hooks/useDoForksExist.js"
import Instructions from "../shared/Instructions"

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
    parentProjectId: "",
  })

  const params = useParams()
  const { id } = params
  const hasForks = useDoForksExist(id)

  useEffect(() => {
    getMyBuild(id).then((userProject) => {
      prepForFrontEnd(userProject)
      setMyBuild(userProject)
    })
  }, [id])

  useEffect(() => {
    document.body.classList.add("grey-background")
    return () => {
      document.body.classList.remove("grey-background")
    }
  }, [])

  const codeMessage = myBuild.githubFileURL?.length ? (
    [
      <h2 className="code-fetched-heading">Code fetched from GitHub just now:</h2>,
      <p>{myBuild.githubFileURL}</p>,
    ]
  ) : (
    <h2>Project Code</h2>
  )
  const partsList = myBuild.parts.map((part, index) => {
    return (
      <div
        className="part-item-in-showpage"
        key={`${part.partName} ${part.partPurchaseURL} ${index}`}
      >
        {part.partPurchaseURL.length === 0 && (
          <p className="part-without-purchase-link">{part.partName}</p>
        )}
        {part.partPurchaseURL.length > 0 && (
          <a href={part.partPurchaseURL} target="_blank" rel="noopener noreferrer">
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
      <div className="project-show__top-buttons">
        <div className="project-show__top-buttons--left">
          <EditBuildButton id={id} />
          <DeleteBuildButton id={id} />
        </div>
        <div className="project-show__top-buttons--right">
          {myBuild.parentProjectId.length > 0 && (
            <DiffViewButton parentProjectId={myBuild.parentProjectId} forkedProjectId={id} />
          )}
          {hasForks && <SeeForkedVersionsButton id={id} />}
        </div>
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
        <h2 data-cy="my-build-title-showpage" className="showpage-title">{myBuild.title}</h2>
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
        <h2 id="parts-heading">Parts</h2>
      </div>
      <div className="showpage-items-container parts-section">
        <div className="parts-list">{partsList}</div>
      </div>
      <div className="showpage-items-container apps-and-platforms">
        <h4>Apps and Platforms:</h4>
          <p>{myBuild.appsAndPlatforms}</p>
      </div>
      <Instructions project={myBuild} />
      <div>
        <div className="showpage-items-container code">
          {codeMessage}
          <pre>
            <code
              className="language-cpp"
            >{myBuild.code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default MyBuildShow
