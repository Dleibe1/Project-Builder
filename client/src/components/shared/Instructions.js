import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"
import { Button } from "@mui/material"
import MarkdownService from "../../services/MarkdownService"

const Instructions = ({ project, setEditingInstructions }) => {
  const history = useHistory()
  useEffect(() => {
    const codeTags = document.querySelectorAll("code")
    codeTags.forEach((tag) => {
      delete tag.dataset.highlighted
    })
    hljs.highlightAll()
  }, [project.instructions])

  return (
    <section className={`instructions-list showpage-items-container ${project.instructions.length === 0 && "empty"}`}>
      {["/edit-my-build/", "/fork-project/", "/create-new-build"].some((allowedPathname) =>
        history.location.pathname.includes(allowedPathname),
      ) && (
        <div className="edit-instructions-button-container">
          <Button
            data-cy="add-or-edit-instructions-button"
            onClick={() => setEditingInstructions(true)}
            className="large-button instructions-list-button edit-instructions"
            variant="contained"
          >
            {project.instructions?.length > 0 && "Edit Instructions"}
            {project.instructions?.length === 0 && "Add Instructions Section"}
          </Button>
        </div>
      )}
      {project.instructions?.length > 0 && (
        <Button
          className="large-button instructions-list-button download-markdown-button-instructions-list"
          variant="contained"
          onClick={() => MarkdownService.downloadHtmlAsMarkdown(project.instructions)}
        >
          Download Instructions as Markdown
        </Button>
      )}
      {project.instructions?.length > 0 && (
        <>
          <h2 id="form-instructions-heading">Instructions</h2>
          <div
            data-cy="instructions-text"
            className="preserve-white-space instruction-text showpage-items-container"
            dangerouslySetInnerHTML={{
              __html: project.instructions
            }}
          ></div>
        </>
      )}
    </section>
  )
}

export default Instructions
