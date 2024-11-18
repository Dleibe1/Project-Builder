import React, { useState, useEffect } from "react"
import Textarea from "@mui/joy/Textarea"
import { Button } from "@mui/material"
import CloudUpload from "@mui/icons-material/CloudUpload"
import Dropzone from "react-dropzone"
import DeleteIcon from "@mui/icons-material/Delete"

const InstructionsSubForm = ({ project, setProject }) => {
  const [editInstructionIndices, setEditInstructionIndices] = useState({})
  const [firstInstruction, setFirstInstruction] = useState("")
  const [addProjectImageIndex, setAddProjectImageIndex] = useState(null)
  const [imageFile, setImageFile] = useState({
    image: {},
  })

  const uploadProjectImage = async () => {
    const newImageFileData = new FormData()
    newImageFileData.append("image", imageFile.image)
    try {
      const response = await fetch("/api/v1/image-uploading", {
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

  const handleFirstInstructionTextInput = (event) => {
    setFirstInstruction(event.currentTarget.value)
  }

  const handleFirstInstructionTextSubmit = (event) => {
    if (firstInstruction.trim().length) {
      const instructions = [...project.instructions]
      instructions.unshift({ instructionText: firstInstruction })
      setProject({
        ...project,
        instructions: instructions,
      })
      setFirstInstruction("")
    }
  }

  const handleAddInstructionBelowButton = (index) => {
    const instructions = [...project.instructions]
    setEditInstructionIndices({ ...editInstructionIndices, [index + 1]: true })
    if (editInstructionIndices[index + 1] !== true) {
      instructions.splice(index + 1, 0, { instructionText: "" })
      setProject({ ...project, instructions: instructions })
    }
  }

  const handleEditInstructionTextSubmit = (index) => {
    if (
      project.instructions[index].instructionText &&
      project.instructions[index].instructionText.length
    ) {
      setEditInstructionIndices({ ...editInstructionIndices, [index]: false })
    }
  }

  const handleEditInstructionTextButton = (index) => {
    setEditInstructionIndices({ ...editInstructionIndices, [index]: true })
  }

  const handleEditInstructionTextInput = (event, index) => {
    const instructions = [...project.instructions]
    instructions[index].instructionText = event.currentTarget.value
    setProject({ ...project, instructions: instructions })
  }

  const handleCancelEditInstruction = (event, index) => {
    const instructions = [...project.instructions]
    if (instructions[index].instructionText.trim().length === 0) {
      instructions.splice(index, 1)
    }
    setProject({ ...project, instructions: instructions })
    setEditInstructionIndices({ ...editInstructionIndices, [index]: false })
  }

  const handleInstructionDelete = (index) => {
    const instructionList = project.instructions.filter((instruction, i) => i !== index)
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
              className="large-button delete-image"
              variant="contained"
              startIcon={<DeleteIcon />}
            >
              Delete Image
            </Button>
            <Button
              onClick={() => handleAddInstructionBelowButton(index)}
              className="large-button delete-image"
              variant="contained"
            >
              Add Instruction Below
            </Button>
            <Button
              className="large-button"
              id="add-instruction-image"
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
          {isEditing && (
            <TinyMCEwysiwyg
              handleEditInstructionTextInput={handleEditInstructionTextInput}
              handleEditInstructionTextButton={handleEditInstructionTextButton}
            />
            // <Textarea
            //   minRows={3}
            //   value={project.instructions[index].instructionText}
            //   placeholder="Edit instruction"
            //   onChange={(event) => handleEditInstructionTextInput(event, index)}
            //   name="instructionText"
            //   sx={{ minWidth: "100%", backgroundColor: "white" }}
            // />
          )}
          {!isEditing && instruction.instructionText.length > 0 && (
            <p className="preserve-white-space instruction-text">{instruction.instructionText}</p>
          )}
          {isEditing ? (
            <div className="instruction-list-buttons-container">
              {instruction.instructionText.length > 0 ? (
                <Button
                  onClick={() => handleEditInstructionTextSubmit(index)}
                  className="large-button delete-image"
                  variant="contained"
                >
                  Save Instruction
                </Button>
              ) : (
                <Button
                  onClick={(event) => handleCancelEditInstruction(event, index)}
                  className="large-button delete-image"
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
                className="large-button delete-image"
                variant="contained"
              >
                Edit Instruction
              </Button>
              <Button
                onClick={() => handleInstructionDelete(index)}
                className="large-button delete-image"
                variant="contained"
                startIcon={<DeleteIcon />}
              >
                Delete Instruction
              </Button>
              <Button
                onClick={() => handleAddInstructionBelowButton(index)}
                className="large-button delete-image"
                variant="contained"
              >
                Add Instruction Below
              </Button>
              <Button
                className="large-button"
                id="add-instruction-image"
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
      <h2 id="form-instructions-heading">Instructions and Images:</h2>
      <div className="form-items-container new-instruction">
        <Textarea
          minRows={3}
          value={firstInstruction}
          placeholder="Enter first instruction"
          onChange={handleFirstInstructionTextInput}
          name="firstInstruction"
          label="Enter first instruction"
          sx={{ minWidth: "100%", backgroundColor: "white" }}
        />
        <div className="add-instruction-button-container">
          <Button
            onClick={handleFirstInstructionTextSubmit}
            className="large-button "
            id="add-instruction-text"
            variant="contained"
          >
            Add New Instruction
          </Button>
        </div>
        <Button
          className="large-button"
          id="add-instruction-image"
          variant="contained"
          startIcon={<CloudUpload />}
        >
          <Dropzone onDrop={handleProjectImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  Add New Image
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
