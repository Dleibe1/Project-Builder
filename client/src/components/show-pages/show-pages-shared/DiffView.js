import React, { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useParams } from "react-router-dom"
import getProjectsToCompare from "../../../api/getProjectsToCompare"
import ReactDiffViewer from "react-diff-viewer-continued"
import MarkdownService from "../../../services/MarkdownService"

const DiffView = (props) => {
  const params = useParams()
  const { parentProjectId, forkedProjectId } = params

  const [parentProjectData, setParentProjectData] = useState({
    user: "",
    title: "",
    tags: [],
    appsAndPlatforms: "",
    instructions: "",
    parts: [],
    description: "",
    code: "",
    githubFileURL: "",
    userId: "",
    thumbnailImage: "",
  })

  const [forkedProjectData, setForkedProjectData] = useState({
    user: "",
    title: "",
    tags: [],
    appsAndPlatforms: "",
    instructions: "",
    parts: [],
    description: "",
    code: "",
    githubFileURL: "",
    userId: "",
    thumbnailImage: "",
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    getProjectsToCompare(parentProjectId, forkedProjectId).then(
      ([parentProjectData, forkedProjectData]) => {
        setParentProjectData(parentProjectData)
        setForkedProjectData(forkedProjectData)
      },
    )
  }, [])

  let parentProjectTags = ""
  let forkedProjectTags = ""
  let parentProjectParts = ""
  let forkedProjectParts = ""
  const parentProjectTagsData = parentProjectData.tags
  const forkedProjectTagsData = forkedProjectData.tags
  const parentProjectPartsData = parentProjectData.parts
  const forkedProjectPartsData = forkedProjectData.parts
  for (const tag of parentProjectTagsData) {
    parentProjectTags += `${tag.tagName}\n`
  }
  for (const tag of forkedProjectTagsData) {
    forkedProjectTags += `${tag.tagName}\n`
  }
  for (const part of parentProjectPartsData) {
    parentProjectParts += `${part.partName}\n`
  }
  for (const part of forkedProjectPartsData) {
    forkedProjectParts += `${part.partName}\n`
  }

  const shouldCompareGithubMainInoFileURL =
    parentProjectData.githubFileURL?.length > 0 || forkedProjectData.githubFileURL?.length > 0

  const parentProjectInstructionsAsMarkdown = MarkdownService.convertHTMLToMarkdown(
    parentProjectData.instructions,
  )

  const forkedProjectInstructionsAsMarkdown = MarkdownService.convertHTMLToMarkdown(
    forkedProjectData.instructions,
  )

  return (
    <div className="project-diff-view">
      <div className="diff-view-top-section">
        <h1 className="diff-view-title">Differences From Original Project</h1>
        <Button
          component={Link}
          to={`/projects/${forkedProjectId}`}
          startIcon={<ArrowBackIcon />}
          className="back-to-project-button"
        >
          Back To Project Page
        </Button>
      </div>
      <h2>Title:</h2>
      <ReactDiffViewer
        oldValue={parentProjectData.title || ""}
        newValue={forkedProjectData.title || ""}
        compareMethod="diffWords"
        showDiffOnly={false}
        splitView={true}
      />
      <h2>Thumbnail URL:</h2>
      <ReactDiffViewer
        oldValue={parentProjectData.thumbnailImage || ""}
        newValue={forkedProjectData.thumbnailImage || ""}
        compareMethod="diffWords"
        showDiffOnly={false}
        splitView={true}
      />
      <h2>Tags:</h2>
      <ReactDiffViewer
        oldValue={parentProjectTags || ""}
        newValue={forkedProjectTags || ""}
        compareMethod="diffWords"
        showDiffOnly={false}
        splitView={true}
      />
      <h2>Description:</h2>
      <ReactDiffViewer
        oldValue={parentProjectData.description || ""}
        newValue={forkedProjectData.description || ""}
        compareMethod="diffSentences"
        showDiffOnly={false}
        splitView={true}
      />
      <h2>Parts:</h2>
      <ReactDiffViewer
        oldValue={parentProjectParts || ""}
        newValue={forkedProjectParts || ""}
        compareMethod="diffWords"
        showDiffOnly={false}
        splitView={true}
      />
      <h2>Apps and Platforms:</h2>
      <ReactDiffViewer
        oldValue={parentProjectData.appsAndPlatforms || ""}
        newValue={forkedProjectData.appsAndPlatforms || ""}
        compareMethod="diffWords"
        showDiffOnly={false}
        splitView={true}
      />
      <h2>Instructions (Markdown Version):</h2>
      <ReactDiffViewer
        oldValue={parentProjectInstructionsAsMarkdown || ""}
        newValue={forkedProjectInstructionsAsMarkdown || ""}
        compareMethod="diffSentences"
        showDiffOnly={false}
        splitView={true}
      />
      {shouldCompareGithubMainInoFileURL && <h2>Main file URL on GitHub:</h2>}
      {shouldCompareGithubMainInoFileURL && (
        <ReactDiffViewer
          oldValue={parentProjectData.githubFileURL || ""}
          newValue={forkedProjectData.githubFileURL || ""}
          compareMethod="diffWords"
          showDiffOnly={false}
          splitView={true}
        />
      )}
      <h2>Code:</h2>
      <ReactDiffViewer
        oldValue={parentProjectData.code || ""}
        newValue={forkedProjectData.code || ""}
        showDiffOnly={false}
        compareMethod="diffLines"
        splitView={true}
      />
    </div>
  )
}

export default DiffView
