import React, { useEffect } from "react"
import DOMPurify from "dompurify"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"

const Instructions = ({ project }) => {
  useEffect(() => {
    //Apply highlighting after default css has been applied
    const codeTags = document.querySelectorAll("code")
    codeTags.forEach((tag) => {
      delete tag.dataset.highlighted
    })
    hljs.highlightAll()
  }, [project.instructions])

  return (
    <div
      className="instructions-list preserve-white-space instruction-text showpage-items-container"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(project.instructions[0].instructionText),
      }}
    ></div>
  )
}

export default Instructions
