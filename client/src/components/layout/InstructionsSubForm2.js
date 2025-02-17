import React, { useEffect, useContext } from "react"
import { EditingInstructionsContext } from "../../contexts/EditingInstructionsContext"
import { Button } from "@mui/material"
import TinyMCE from "./TinyMCE"
import DOMPurify from "dompurify"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"

const InstructionsSubForm2 = ({ project, setProject }) => {

  const { editing, setEditing } = useContext(EditingInstructionsContext)

  const handleToggleInstructionsEdit = () => {
      setEditing(true)
  }

  useEffect(() => {
    //Apply highlighting after default css has been applied
    const codeTags = document.querySelectorAll("code")
    codeTags.forEach((tag) => {
      delete tag.dataset.highlighted
    })
    hljs.highlightAll()
  }, [editing])

  return (
    <div className="instructions-and-images">
      <h2 id="form-instructions-heading">Instructions:</h2>
      <div className="instruction-text-container form-items-container">
        {!editing && (
          <div className="instruction-list-buttons-container">
            <Button
              onClick={() => handleToggleInstructionsEdit()}
              className="large-button instruction-list-button"
              variant="contained"
            >
              Edit Instructions
            </Button>
          </div>
        )}
        {editing && (
          <section className="form-items-container new-instruction">
            <TinyMCE project={project} setProject={setProject} />
          </section>
        )}
        {!editing && (
          <div
            className="preserve-white-space instruction-text"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(project.instructions[0].instructionText),
            }}
          ></div>
        )}
      </div>
    </div>
  )
}

export default InstructionsSubForm2
