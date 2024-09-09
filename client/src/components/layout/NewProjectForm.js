import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import Dropzone from "react-dropzone"
import { Button, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import CloudUpload from "@mui/icons-material/CloudUpload"
import Send from "@mui/icons-material/Send"
import Textarea from "@mui/joy/Textarea"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"

const NewProjectForm = (props) => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [imageFile, setImageFile] = useState({
    image: {},
  })
  const [thumbnailImageFile, setThumbnailImageFile] = useState({
    image: {},
  })
  const [editInstructionIndices, setEditInstructionIndices] = useState({})
  const [newProject, setNewProject] = useState({
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
      setNewProject({
        ...newProject,
        instructions: [...newProject.instructions, { imageURL: body.imageURL }],
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
      setNewProject({ ...newProject, thumbnailImage: body.imageURL })
    } catch (error) {
      console.error(`Error in uploadProjectImage Fetch: ${error.message}`)
    }
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

  const postProject = async (newProjectData) => {
    try {
      const response = await fetch('/api/v1/projects/new-project', {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newProjectData),
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
    postProject({
      ...newProject,
      userId: props.user.id,
      githubFileURL: newProject.githubFileURL?.trim(),
    })
  }

  const handleInputChange = (event) => {
    setNewProject({ ...newProject, [event.currentTarget.name]: event.currentTarget.value })
  }

  const handlePartSubmit = () => {
    if (newProject.newPart.trim().length) {
      setNewProject({
        ...newProject,
        parts: [...newProject.parts, { partName: newProject.newPart }],
        newPart: "",
      })
    }
  }

  const handlePartDelete = (index) => {
    const partsList = newProject.parts.filter((part, i) => i !== index)
    setNewProject({ ...newProject, parts: partsList })
  }

  const handleEditInstructionTextSubmit = (index) => {
    const instructions = [...newProject.instructions]
    if (instructions[index] && instructions[index].instructionText.trim().length) {
      instructions.splice(index, 1, { instructionText: instructions[index].instructionText })
      setNewProject({ ...newProject, instructions: instructions })
      setEditInstructionIndices({ ...editInstructionIndices, [index]: false })
    }
  }

  const handleNewInstructionTextSubmit = (event) => {
    if (newProject.newInstruction.trim().length) {
      setNewProject({
        ...newProject,
        instructions: [...newProject.instructions, { instructionText: newProject.newInstruction }],
        newInstruction: "",
      })
    }
  }

  const handleEditInstructionTextButton = (index) => {
    setEditInstructionIndices({ ...editInstructionIndices, [index]: true })
  }

  const handleEditInstructionTextInput = (event, index) => {
    const instructions = [...newProject.instructions]
    instructions[index].instructionText = event.currentTarget.value
    setNewProject({ ...newProject, instructions: instructions })
  }

  const handleInstructionDelete = (index) => {
    const instructionList = newProject.instructions.filter((instruction, i) => i !== index)
    setNewProject({ ...newProject, instructions: instructionList })
  }

  let thumbNailImage = [
    <div className="project-image-container thumbnail-image-container ">
      <img className="project-image" src={newProject.thumbnailImage} />
    </div>,
  ]

  thumbNailImage = newProject.thumbnailImage.length ? thumbNailImage : []

  const partsList = newProject.parts.map((part, index) => {
    
    return (
      <div className="part-item-in-form">
        <p key={`${part.partName}${index}`}> {part.partName}</p>
        <Button
          onClick={() => handlePartDelete(index)}
          className="large-button delete-part"
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Delete Part
        </Button>
      </div>
    )
  })

  const instructionList = newProject.instructions.map((instruction, index) => {
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
    } else if (instruction.instructionText) {
      const isEditing = editInstructionIndices[index] === true
      return (
        <div className="instruction-text-container form-items-container">
          {isEditing ? (
            <Textarea
              minRows={3}
              value={newProject.instructions[index].instructionText}
              placeholder="Edit instruction"
              onChange={(event) => handleEditInstructionTextInput(event, index)}
              name="instructionText"
              sx={{ minWidth: "100%", backgroundColor: "white" }}
            />
          ) : (
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
                  startIcon={<DeleteIcon />}
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
              </>
            )}
          </div>
        </div>
      )
    }
  })

  if (shouldRedirect) {
    return <Redirect push to={"/my-builds-list?page=1"} />
  }

  return (
    <div className="new-build-form-container project-show">
      <ErrorList errors={errors} />
      <form key="new-build-form" id="new-build-form" onSubmit={handleSubmit}>
        <div className="form-items-container top-section">
          <h1>New Project</h1>
          <TextField
            value={newProject.title}
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
            value={newProject.description}
            placeholder="Enter description"
            onChange={handleInputChange}
            name="description"
            label="Enter Project Description"
            sx={{ minWidth: "100%", backgroundColor: "white" }}
          />
          <div className="project-image-container thumbnail-image-container">
            <img className="project-image" src={newProject.thumbnailImage} />
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
                    {newProject.thumbnailImage.length
                      ? "Change Thumbnail Image"
                      : "Upload Thumbnail Image"}
                  </div>
                </section>
              )}
            </Dropzone>
          </Button>
          <TextField
            value={newProject.appsAndPlatforms}
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
            value={newProject.newPart}
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
            value={newProject.newInstruction}
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
              value={newProject.code}
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
            value={newProject.githubFileURL}
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

export default NewProjectForm
