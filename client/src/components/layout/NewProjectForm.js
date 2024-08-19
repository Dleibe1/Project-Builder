import React, { useEffect, useState, useRef } from "react"
import { Redirect } from "react-router-dom"
import Dropzone from "react-dropzone"
import { Button, TextField, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import CloudUpload from "@mui/icons-material/CloudUpload"
import Send from "@mui/icons-material/Send"
import Textarea from "@mui/joy/Textarea"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"

const NewProjectForm = (props) => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [part, setPart] = useState("")
  const [imageFile, setImageFile] = useState({
    image: {},
  })
  const [thumbnailImageFile, setThumbnailImageFile] = useState({
    image: {},
  })
  const [instructionText, setInstructionText] = useState("")
  const [newProject, setNewProject] = useState({
    title: "",
    tags: "",
    appsAndPlatforms: "",
    instructions: [],
    parts: [],
    description: "",
    code: "",
    githubFileURL: "",
    userId: "",
    thumbnailImage: "",
  })

  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      uploadProjectImage()
    }
  }, [imageFile])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      uploadThumbnailImage()
    }
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
      const response = await fetch(`/api/v1/projects/new-project`, {
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
      githubFileURL: newProject.githubFileURL.trim(),
    })
  }

  const handleInputChange = (event) => {
    setNewProject({ ...newProject, [event.currentTarget.name]: event.currentTarget.value })
  }

  const handlePartInput = (event) => {
    setPart(event.currentTarget.value)
  }

  const handlePartSubmit = () => {
    if (part.length) {
      setNewProject({ ...newProject, parts: [...newProject.parts, part] })
    }
    setPart("")
  }

  const handlePartDelete = (index) => {
    const partsList = newProject.parts.filter((part, i) => i !== index)
    setNewProject({ ...newProject, parts: partsList })
  }

  const handleInstructionTextInput = (event) => {
    setInstructionText(event.currentTarget.value)
  }

  const handleInstructionTextSubmit = () => {
    if (instructionText.length) {
      setNewProject({
        ...newProject,
        instructions: [...newProject.instructions, { instructionText: instructionText }],
      })
    }
    setInstructionText("")
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
        <p key={`${part}${index}`}> {part}</p>
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
            sx={{
              "&:hover": {
                textDecoration: "none",
                color: "white",
              },
            }}
            startIcon={<DeleteIcon />}
          >
            Delete Image
          </Button>
        </div>
      )
    } else if (instruction.instructionText) {
      return (
        <div className="instruction-text-container form-items-container">
          <p className="preserve-white-space instruction-text">{instruction.instructionText}</p>
          <Button
            onClick={() => handleInstructionDelete(index)}
            className="large-button delete-image"
            variant="contained"
            sx={{
              "&:hover": {
                textDecoration: "none",
                color: "white",
              },
            }}
            startIcon={<DeleteIcon />}
          >
            Delete Instruction
          </Button>
        </div>
      )
    }
  })

  if (shouldRedirect) {
    return <Redirect push to={"/my-builds-list/1"} />
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
            sx={{
              "&:hover": {
                textDecoration: "none",
                color: "white",
              },
            }}
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

          {/* <label htmlFor="tags">
          Tags:
          <input
            value={newProject.tags}
            onChange={handleInputChange}
            type="text"
            id="tags"
            name="tags"
          />
         </label> */}
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
            value={part}
            onChange={handlePartInput}
            label="Enter new part"
            name="part"
          />
          <Button
            onClick={handlePartSubmit}
            className="large-button"
            id="add-part"
            variant="contained"
            sx={{
              "&:hover": {
                textDecoration: "none",
                color: "white",
              },
            }}
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
            value={instructionText}
            placeholder="Enter new instruction"
            onChange={handleInstructionTextInput}
            name="instructionText"
            label="Enter new instruction"
            sx={{ minWidth: "100%", backgroundColor: "white" }}
          />
          <div className="add-instruction-button-container">
            <Button
              onClick={handleInstructionTextSubmit}
              className="large-button "
              id="add-instruction-text"
              variant="contained"
              sx={{
                "&:hover": {
                  textDecoration: "none",
                  color: "white",
                },
              }}
            >
              Add Instruction
            </Button>
          </div>

          <Button
            className="large-button"
            id="add-instruction-image"
            variant="contained"
            sx={{
              "&:hover": {
                textDecoration: "none",
                color: "white",
              },
            }}
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
            <textarea
              value={newProject.code}
              rows="20"
              cols="1"
              onChange={handleInputChange}
              type="text"
              id="code"
              name="code"
            />
          </label>
        </div>
        <div className="form-items-container github-url-and-submit">
          <h2 id="github-url-explanation">
            Is this a work in progress? Pasting the URL of your main sketch file on Github will
            automatically keep the code you share up to date.
          </h2>
          <Typography id="github-example-url" variant="h6" gutterBottom>
            Example: https://github.com/antronyx/ServoTester/blob/main/main.ino
          </Typography>
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
