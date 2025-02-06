import React, { useState, useEffect } from "react"
import { Button } from "@mui/material"
import CloudUpload from "@mui/icons-material/CloudUpload"
import Dropzone from "react-dropzone"
import DeleteIcon from "@mui/icons-material/Delete"
import TinyMCE from "./TinyMCE"
import DOMPurify from "dompurify"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"

const InstructionsSubForm = ({ project, setProject }) => {
  const [editInstructionIndices, setEditInstructionIndices] = useState({ 0: true })
  const [addProjectImageIndex, setAddProjectImageIndex] = useState(null)
  const [imageFile, setImageFile] = useState({
    image: {},
  })

  useEffect(() => {
    hljs.highlightAll()
  }, [editInstructionIndices])

  const uploadProjectImage = async () => {
    const newImageFileData = new FormData()
    newImageFileData.append("image", imageFile.image)
    try {
      const response = await fetch("/api/v1/image-upload", {
        method: "POST",
        headers: {
          Accept: "image/jpeg",
        },
        body: newImageFileData,
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      const instructions = [...project.instructions]
      if (instructions.length === 1 && instructions[0].instructionText.trim().length === 0) {
        instructions.splice(0, 1)
        setProject({ ...project, instructions: [] })
      }
      instructions.splice(addProjectImageIndex, 0, { imageURL: body.imageURL })
      setProject((prevState) => ({
        ...prevState,
        instructions: instructions,
      }))
    } catch (error) {
      console.error(`Error in uploadProjectImage Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    uploadProjectImage()
  }, [imageFile])

  const handleAddNewFirstInstruction = () => {
    const instructions = [...project.instructions]
    if (editInstructionIndices[0] !== true) {
      instructions.unshift({ instructionText: "" })
      setProject({ ...project, instructions: instructions })
      setEditInstructionIndices({ ...editInstructionIndices, [0]: true })
    } else if (instructions[0].imageURL) {
      instructions.unshift({ instructionText: "" })
      setProject({ ...project, instructions: instructions })
      setEditInstructionIndices({ ...editInstructionIndices, [0]: true })
    }
  }

  const handleAddInstructionBelowButton = (index) => {
    if (editInstructionIndices[index + 1] !== true) {
      const instructions = [...project.instructions]
      setEditInstructionIndices({ ...editInstructionIndices, [index + 1]: true })
      instructions.splice(index + 1, 0, { instructionText: "" })
      setProject({ ...project, instructions: instructions })
    }
  }

  const handleEditInstructionTextSubmit = (index) => {
    if (
      project.instructions[index].instructionText &&
      project.instructions[index].instructionText.trim().length
    ) {
      setEditInstructionIndices({ ...editInstructionIndices, [index]: false })
    }
  }

  const handleEditInstructionTextButton = (index) => {
    setEditInstructionIndices({ ...editInstructionIndices, [index]: true })
  }

  const handleCancelEditInstruction = (event, index) => {
    const instructions = [...project.instructions]
    if (instructions[index].instructionText.trim().length === 0 && instructions.length > 1) {
      instructions.splice(index, 1)
      setProject({ ...project, instructions: instructions })
      setEditInstructionIndices({ ...editInstructionIndices, [index]: false })
    }
  }

  const handleInstructionDelete = (index) => {
    const instructionList = project.instructions.filter((instruction, i) => i !== index)
    if (instructionList.length === 0) {
      instructionList.splice(0, 0, { instructionText: "" })
      setEditInstructionIndices({ 0: true })
    }
    setProject({ ...project, instructions: instructionList })
  }

  const handleProjectImageUpload = (acceptedImage, index) => {
    setAddProjectImageIndex(index + 1)
    setImageFile({
      image: acceptedImage[0],
    })
  }

  const instructionList = project.instructions.map((instruction, index) => {
    if (instruction.imageURL) {
      return (
        <div
          key={`${instruction.imageURL}${index}`}
          className="project-image-container form-items-container"
        >
          <img className="project-image" src={instruction.imageURL} />
          <div className="instruction-list-buttons-container">
            <Button
              onClick={() => handleInstructionDelete(index)}
              className="large-button instruction-list-button"
              variant="contained"
              startIcon={<DeleteIcon />}
            >
              Delete Image
            </Button>
            <Button
              onClick={() => handleAddInstructionBelowButton(index)}
              className="large-button instruction-list-button"
              variant="contained"
            >
              Add Instruction Below
            </Button>
            <Button
              className="large-button instruction-list-button"
              variant="contained"
              startIcon={<CloudUpload />}
            >
              <Dropzone
                onDrop={(acceptedImage) => {
                  handleProjectImageUpload(acceptedImage, index)
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      Add Image Below
                    </div>
                  </section>
                )}
              </Dropzone>
            </Button>
          </div>
        </div>
      )
    } else {
      const isEditing = editInstructionIndices[index] === true
      return (
        <div className="instruction-text-container form-items-container">
          {isEditing && <TinyMCE project={project} setProject={setProject} index={index} />}
          {!isEditing && instruction.instructionText.length > 0 && (
            <div
              className="preserve-white-space instruction-text"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(instruction.instructionText) }}
            ></div>
          )}
          {isEditing ? (
            <div className="instruction-list-buttons-container">
              {instruction.instructionText.length > 0 || project.instructions.length === 1 ? (
                <Button
                  onClick={() => handleEditInstructionTextSubmit(index)}
                  className="large-button instruction-list-button"
                  variant="contained"
                >
                  Save Instruction
                </Button>
              ) : (
                <Button
                  onClick={(event) => handleCancelEditInstruction(event, index)}
                  className="large-button instruction-list-button"
                  variant="contained"
                >
                  Cancel
                </Button>
              )}
            </div>
          ) : (
            <div className="instruction-list-buttons-container">
              <Button
                onClick={() => handleEditInstructionTextButton(index)}
                className="large-button instruction-list-button"
                variant="contained"
              >
                Edit Instruction
              </Button>
              <Button
                onClick={() => handleInstructionDelete(index)}
                className="large-button instruction-list-button"
                variant="contained"
                startIcon={<DeleteIcon />}
              >
                Delete Instruction
              </Button>
              <Button
                onClick={() => handleAddInstructionBelowButton(index)}
                className="large-button instruction-list-button"
                variant="contained"
              >
                Add Instruction Below
              </Button>
              <Button
                className="large-button instruction-list-button"
                variant="contained"
                startIcon={<CloudUpload />}
              >
                <Dropzone
                  onDrop={(acceptedImage) => {
                    handleProjectImageUpload(acceptedImage, index)
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        Add Image Below
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Button>
            </div>
          )}
        </div>
      )
    }
  })

  return (
    <div className="instructions-and-images">
      <h2 id="form-instructions-heading">Instruction Steps and Images:</h2>
      <div className="form-items-container new-instruction">
      <p className="preserve-white-space">
        Each instruction should be a single step in constructing your Arduino project.
        If a user forks your project, they may add, edit, or delete individual instructions for their forked version
        </p>
        {project.instructions.length > 1 || project.instructions[0]?.imageURL && (
          <div className="add-instruction-button-container">
            <Button
              className="large-button instruction-list-button"
              variant="contained"
              onClick={handleAddNewFirstInstruction}
            >
              Add New First Instruction
            </Button>
          </div>
        )}
        <Button
          className="large-button instruction-list-button"
          variant="contained"
          startIcon={<CloudUpload />}
        >
          <Dropzone
            onDrop={(acceptedImage) => {
              handleProjectImageUpload(acceptedImage, -1)
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  Add Image
                </div>
              </section>
            )}
          </Dropzone>
        </Button>
      </div>
      <div>{instructionList}</div>
    </div>
  )
}

export default InstructionsSubForm
