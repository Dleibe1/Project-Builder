import React, { useEffect } from "react"
import DOMPurify from "dompurify"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"
import { Button } from "@mui/material"
import { downloadHtmlAsMarkdown } from "../../services/markdownService"

const InstructionsList = ({ project }) => {
  useEffect(() => {
    //Apply highlighting after default css has been applied
    const codeTags = document.querySelectorAll("code")
    codeTags.forEach((tag) => {
      delete tag.dataset.highlighted
    })
    hljs.highlightAll()
  }, [project.instructions])

  return (
    <section className="instructions-list showpage-items-container">
      {project.instructions?.length > 0 && (
        <Button
          className="large-button instruction-list-button download-markdown-button"
          variant="contained"
          onClick={() => downloadHtmlAsMarkdown(project.instructions)}
        >
          Download Instructions as Markdown
        </Button>
      )}
      <h2 id="form-instructions-heading">Instructions:</h2>
      <div
        className="preserve-white-space instruction-text showpage-items-container"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(project.instructions),
        }}
      ></div>
    </section>
  )
}

export default InstructionsList
