import React, { useEffect, useState } from "react"
import { Button } from "@mui/material"
import DOMPurify from "dompurify"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"

const Instructions = ({ project, setEditingInstructions }) => {
  useEffect(() => {
    //Apply highlighting after default css has been applied
    const codeTags = document.querySelectorAll("code")
    codeTags.forEach((tag) => {
      delete tag.dataset.highlighted
    })
    hljs.highlightAll()
  }, [project])

  return (
    <div className="instructions-and-images">
      <div className="instruction-text-container form-items-container">
        <h2 id="form-instructions-heading">Instructions:</h2>
        <div className="instruction-list-buttons-container edit-instructions-button-container">
          <Button
            className="large-button instruction-list-button edit-instructions-button"
            variant="contained"
            onClick={() => setEditingInstructions(true)}
          >
            Edit Instructions
          </Button>
        </div>
        <div
          className="preserve-white-space instruction-text"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(project.instructions[0].instructionText),
          }}
        ></div>
      </div>
    </div>
  )
}

export default Instructions
