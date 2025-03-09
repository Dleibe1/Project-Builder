import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReactDiffViewer from "react-diff-viewer-continued"
import MarkdownService from "../../services/MarkdownService"

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
    getProjectsToCompare()
  }, [])

  const getProjectsToCompare = async () => {
    try {
      const response = await fetch(
        `/api/v1/projects/${parentProjectId}/forks/diff-view/${forkedProjectId}`,
      )
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      const { parentProjectData, forkedProjectData } = responseBody
      setParentProjectData(parentProjectData)
      setForkedProjectData(forkedProjectData)
    } catch (error) {
      console.log(error)
    }
  }

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

  const compareGithubMainInoFileURL =
    parentProjectData.githubFileURL?.length > 0 || forkedProjectData.githubFileURL?.length > 0

  const parentProjectInstructionsAsMarkdown = MarkdownService.convertHTMLToMarkdown(
    parentProjectData.instructions,
  )

  const forkedProjectInstructionsAsMarkdown = MarkdownService.convertHTMLToMarkdown(
    forkedProjectData.instructions,
  )

  return (
    <div className="project-diff-view">
      <h1 className="diff-view-title">Differences From Original Project</h1>
      <h2>Title:</h2>
      <ReactDiffViewer
        oldValue={parentProjectData.title || ""}
        newValue={forkedProjectData.title || ""}
        compareMethod="diffWords"
        splitView={true}
      />
      <h2>Thumbnail URL:</h2>
      <ReactDiffViewer
        oldValue={parentProjectData.thumbnailImage || ""}
        newValue={forkedProjectData.thumbnailImage || ""}
        compareMethod="diffWords"
        splitView={true}
      />
      <h2>Tags:</h2>
      <ReactDiffViewer
        oldValue={parentProjectTags || ""}
        newValue={forkedProjectTags || ""}
        compareMethod="diffWords"
        splitView={true}
      />
      <h2>Description:</h2>
      <ReactDiffViewer
        oldValue={parentProjectData.description || ""}
        newValue={forkedProjectData.description || ""}
        compareMethod="diffSentences"
        splitView={true}
      />
      <h2>Parts:</h2>
      <ReactDiffViewer
        oldValue={parentProjectParts || ""}
        newValue={forkedProjectParts || ""}
        compareMethod="diffWords"
        splitView={true}
      />
      <h2>Apps and Platforms:</h2>
      <ReactDiffViewer
        oldValue={parentProjectData.appsAndPlatforms || ""}
        newValue={forkedProjectData.appsAndPlatforms || ""}
        compareMethod="diffWords"
        splitView={true}
      />
      <h2>Instructions:</h2>
      <ReactDiffViewer
        oldValue={parentProjectInstructionsAsMarkdown || ""}
        newValue={forkedProjectInstructionsAsMarkdown || ""}
        compareMethod="diffSentences"
        splitView={true}
      />
      {compareGithubMainInoFileURL && <h2>Main file URL:</h2>}
      {compareGithubMainInoFileURL && <ReactDiffViewer
        oldValue={parentProjectData.githubFileURL || ""}
        newValue={forkedProjectData.githubFileURL || ""}
        compareMethod="diffWords"
        splitView={true}
      />}
      <h2>Code:</h2>
      <ReactDiffViewer
        oldValue={parentProjectData.code || ""}
        newValue={forkedProjectData.code || ""}
        compareMethod="diffWords"
        splitView={true}
      />
    </div>
  )
}

export default DiffView
