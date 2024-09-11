import React, { useState, useEffect } from "react"
import { Redirect, useParams } from "react-router-dom"
import Dropzone from "react-dropzone"
import { Button, TextField } from "@mui/material"
import Textarea from "@mui/joy/Textarea"
import DeleteIcon from "@mui/icons-material/Delete"
import CloudUpload from "@mui/icons-material/CloudUpload"
import Send from "@mui/icons-material/Send"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"
import prepForFrontEnd from "../../services/prepForFrontEnd.js"
import { text } from "cheerio"

const EditBuildForm = (props) => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [imageFile, setImageFile] = useState({
    image: {},
  })
  const [thumbnailImageFile, setThumbnailImageFile] = useState({
    image: {},
  })
  const params = useParams()
  const { id } = params
  const [editInstructionIndices, setEditInstructionIndices] = useState({})
  const [newInstructionIndices, setNewInstructionIndices] = useState({})
  const [editedProject, setEditedProject] = useState({
    title: "",
    tags: "",
    appsAndPlatforms: "",
    instructions: [],
    newInstruction: "",
    parts: [],
    newPart: "",
    description: "",
    code: "",
    githubFileURL: "",
    userId: "",
    thumbnailImage: "",
  })
  useEffect(() => {
    document.body.classList.add("grey-background")
    return () => {
      document.body.classList.remove("grey-background")
    }
  }, [])

  useEffect(() => {
    uploadProjectImage()
  }, [imageFile])

  useEffect(() => {
    uploadThumbnailImage()
  }, [thumbnailImageFile])

  useEffect(() => {
    getProject()
  }, [])

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
      setEditedProject({
        ...editedProject,
        instructions: [...editedProject.instructions, { imageURL: body.imageURL }],
      })
    } catch (error) {
      console.error(`Error in uploadProjectImage Fetch: ${error.message}`)
    }
  }

  const uploadThumbnailImage = async () => {
    const thumbnailImageFileData = new FormData()
    thumbnailImageFileData.append("image", thumbnailImageFile.image)
    try {
      const response = await fetch("/api/v1/image-uploading", {
        method: "POST",
        headers: {
          Accept: "image/jpeg",
        },
        body: thumbnailImageFileData,
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setEditedProject({ ...editedProject, thumbnailImage: body.imageURL })
    } catch (error) {
      console.error(`Error in uploadProjectImage Fetch: ${error.message}`)
    }
  }

  const getProject = async () => {
    try {
      const response = await fetch(`/api/v1/my-builds/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      const build = responseBody.userBuild
      prepForFrontEnd(build)
      setEditedProject((prevState) => ({
        ...prevState,
        ...build,
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const updateProject = async (editedProjectData) => {
    try {
      const response = await fetch(`/api/v1/my-builds/${id}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(editedProjectData),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        }
      }
      setShouldRedirect(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateProject(editedProject)
  }

  const handleInputChange = (event) => {
    setEditedProject({ ...editedProject, [event.currentTarget.name]: event.currentTarget.value })
  }

  const handleNewInstructionTextSubmit = (event) => {
    if (editedProject.newInstruction.trim().length) {
      setEditedProject({
        ...editedProject,
        instructions: [
          ...editedProject.instructions,
          { instructionText: editedProject.newInstruction },
        ],
        newInstruction: "",
      })
    }
  }

  const handlePartSubmit = () => {
    if (editedProject.newPart.trim().length) {
      setEditedProject({
        ...editedProject,
        parts: [...editedProject.parts, { partName: editedProject.newPart }],
        newPart: "",
      })
    }
  }

  const handlePartDelete = (index) => {
    const partsList = editedProject.parts.filter((part, i) => i !== index)
    setEditedProject({ ...editedProject, parts: partsList })
  }

  const handleEditInstructionTextSubmit = (index) => {
    setEditInstructionIndices({ ...editInstructionIndices, [index]: false })
  }

  const handleEditInstructionTextButton = (index) => {
    setEditInstructionIndices({ ...editInstructionIndices, [index]: true })
  }

  const handleEditInstructionTextInput = (event, index) => {
    const instructions = [...editedProject.instructions]
    instructions[index].instructionText = event.currentTarget.value
    setEditedProject({ ...editedProject, instructions: instructions })
  }

  const handleInstructionDelete = (index) => {
    const instructionList = editedProject.instructions.filter((instruction, i) => i !== index)
    setEditedProject({ ...editedProject, instructions: instructionList })
  }

  const handleAddInstructionBelowButton = (index) => {
    setNewInstructionIndices({ ...newInstructionIndices, [index + 1]: true })
    const instructions = [...editedProject.instructions]
    instructions.splice(index + 1, 0, { instructionText: "" })
    setEditedProject({ ...editedProject, instructions: instructions })
  }

  const handleAddInstructionBelowInput = (event, index) => {
    const instructions = [...editedProject.instructions]
    instructions[index].instructionText = event.currentTarget.value
    setEditedProject({ ...editedProject, instructions: instructions })
  }

  const handleAddInstructionBelowSubmit = (index) => {
    setNewInstructionIndices({ ...newInstructionIndices, [index]: false })
  }

  const handleProjectImageUpload = (acceptedImage) => {
    setImageFile({
      image: acceptedImage[0],
    })
  }

  const handleThumbnailImageUpload = (acceptedImage) => {
    setThumbnailImageFile({
      image: acceptedImage[0],
    })
  }

  const partsList = editedProject.parts.map((part, index) => {
    return (
      <div className="part-item-in-form">
        <p key={`${part.partName}${index}`}> {part.partName}</p>
        <Button
          onClick={() => handlePartDelete(index)}
          className="large-button delete-part"
          variant="contained"
          sx={{
            width: "max-content",
            "&:hover": {
              textDecoration: "none",
              color: "white",
            },
          }}
          startIcon={<DeleteIcon />}
        >
          Delete Part
        </Button>
      </div>
    )
  })

  const instructionList = editedProject.instructions.map((instruction, index) => {
    if (instruction.imageURL) {
      return (
        <div
          key={`${instruction.imageURL}${index}`}
          className="project-image-container form-items-container"
        >
          <img className="project-image" src={instruction.imageURL} />
          <Button
            onClick={() => handleInstructionDelete(index)}
            className="large-button delete-image"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete Image
          </Button>
        </div>
      )
    } else {
      if (newInstructionIndices[index] === true) {
        return (
          <div className="instruction-text-container form-items-container">
            <Textarea
              minRows={3}
              value={editedProject.instructions[index].instructionText}
              placeholder="Add New Instruction"
              onChange={(event) => handleAddInstructionBelowInput(event, index)}
              name="instructionBelow"
              sx={{ minWidth: "100%", backgroundColor: "white" }}
            />
            <Button
              onClick={() => handleAddInstructionBelowSubmit(index)}
              className="large-button delete-image"
              variant="contained"
            >
              Save Instruction
            </Button>
          </div>
        )
      } else {
        const isEditing = editInstructionIndices[index] === true
        return (
          <div className="instruction-text-container form-items-container">
            {isEditing && (
              <Textarea
                minRows={3}
                value={editedProject.instructions[index].instructionText}
                placeholder="Edit instruction"
                onChange={(event) => handleEditInstructionTextInput(event, index)}
                name="instructionText"
                sx={{ minWidth: "100%", backgroundColor: "white" }}
              />
            )}
            {!isEditing && newInstructionIndices[index - 1] !== true && (
              <p className="preserve-white-space instruction-text">{instruction.instructionText}</p>
            )}
            <div className="instruction-list-buttons-container">
              {isEditing ? (
                <Button
                  onClick={() => handleEditInstructionTextSubmit(index)}
                  className="large-button delete-image"
                  variant="contained"
                >
                  Save Instruction
                </Button>
              ) : (
                <>
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
                  {index !== editedProject.instructions.length - 1 && (
                    <Button
                      onClick={() => handleAddInstructionBelowButton(index)}
                      className="large-button delete-image"
                      variant="contained"
                    >
                      Add Instruction Below
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        )
      }
    }
  })

  if (shouldRedirect) {
    return <Redirect push to={"/my-builds-list?page=1"} />
  }

  return (
    <div className="fork-project-form-container project-show">
      <ErrorList errors={errors} />
      <form key="new-build-form" id="fork-project-form" onSubmit={handleSubmit}>
        <div className="form-items-container top-section">
          <h1>Edit Project</h1>
          <TextField
            value={editedProject.title}
            className="form-input text-field"
            fullWidth
            id="form-title"
            onChange={handleInputChange}
            label="Project Title *"
            name="title"
          />
          <h2>Description:</h2>
          <Textarea
            minRows={3}
            value={editedProject.description}
            placeholder="Enter description"
            onChange={handleInputChange}
            name="description"
            label="Enter Project Description"
            sx={{ minWidth: "100%", backgroundColor: "white" }}
          />
          <div className="project-image-container thumbnail-image-container">
            <img className="project-image" src={editedProject.thumbnailImage} />
          </div>
          <Button
            className="large-button change-thumbnail-image"
            variant="contained"
            startIcon={<CloudUpload />}
          >
            <Dropzone onDrop={handleThumbnailImageUpload}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    Change Thumbnail Image
                  </div>
                </section>
              )}
            </Dropzone>
          </Button>
          <TextField
            value={editedProject.appsAndPlatforms}
            className="form-input text-field"
            fullWidth
            onChange={handleInputChange}
            label="Apps and platforms"
            name="appsAndPlatforms"
          />
          <h2 id="parts-heading-form">Parts:</h2>
          <div className="form-parts-list">{partsList}</div>
        </div>
        <div id="part-input-container" className="form-items-container">
          <TextField
            sx={{ width: "100%" }}
            id="part"
            className="part"
            value={editedProject.newPart}
            onChange={handleInputChange}
            label="Enter new part"
            name="newPart"
          />
          <Button
            onClick={handlePartSubmit}
            className="large-button add-part"
            id="add-part"
            variant="contained"
          >
            Add Part
          </Button>
        </div>
        <div className="instructions-and-images">
          <h2 id="form-instructions-heading">Instructions and Images:</h2>
          <div>{instructionList}</div>
        </div>
        <div className="form-items-container new-instruction">
          <Textarea
            minRows={3}
            value={editedProject.newInstruction}
            placeholder="Enter new instruction"
            onChange={handleInputChange}
            name="newInstruction"
            label="Enter new instruction"
            sx={{ minWidth: "100%", backgroundColor: "white" }}
          />
          <div className="add-instruction-button-container">
            <Button
              onClick={handleNewInstructionTextSubmit}
              className="large-button "
              id="add-instruction-text"
              variant="contained"
            >
              Add Instruction
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
                    Upload Image
                  </div>
                </section>
              )}
            </Dropzone>
          </Button>
        </div>
        <div className="form-items-container">
          <h2 className="code-heading">Code:</h2>
          <label htmlFor="code" className="form-input" id="code-input">
            <Textarea
              value={editedProject.code}
              minRows="10"
              cols="1"
              onChange={handleInputChange}
              type="text"
              name="code"
              sx={{ backgroundColor: "white" }}
            />
          </label>
        </div>
        <div className="form-items-container github-url-and-submit">
          <h2 id="github-url-explanation">
            Is this a work in progress? Pasting the URL of your main sketch file on Github will
            automatically keep the code you share up to date.
          </h2>
          <p id="github-example-url">
            Example: https://github.com/antronyx/ServoTester/blob/main/main.ino
          </p>
          <TextField
            value={editedProject.githubFileURL}
            fullWidth
            onChange={handleInputChange}
            label="GitHub main sketch file URL"
            name="githubFileURL"
          />
          <ErrorList errors={errors} id="form-error-list" />
          <Button
            type="submit"
            className="large-button"
            id="submit-form"
            variant="outlined"
            size="large"
            endIcon={<Send />}
          >
            Submit Project
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditBuildForm
