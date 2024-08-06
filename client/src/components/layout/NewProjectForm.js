import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import Dropzone from "react-dropzone"
import { Button, TextField, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import CloudUpload from "@mui/icons-material/CloudUpload"
import Send from "@mui/icons-material/Send"
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

  useEffect(() => {
    document.body.classList.add("grey-background")
    return () => {
      document.body.classList.remove("grey-background")
    }
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

  useEffect(() => {
    uploadProjectImage()
  }, [imageFile])

  useEffect(() => {
    uploadThumbnailImage()
  }, [thumbnailImageFile])

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
    <div className="image-list-container">
      <img className="project-image" src={newProject.thumbnailImage} />
    </div>,
  ]

  thumbNailImage = newProject.thumbnailImage.length ? thumbNailImage : []

  const partsList = newProject.parts.map((part, index) => {
    return (
      <div key={`${part}${index}`}>
        <p>{part}</p>
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
        <div className="image-list-container">
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
        <div className="instruction-text-container">
          <p>{instruction.instructionText}</p>
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
    return <Redirect push to={"/my-builds"} />
  }

  return (
    <div className="new-build-form-container">
      <Typography variant="h3" gutterBottom>
        Create New Project
      </Typography>
      <ErrorList errors={errors} />
      <form key="new-build-form" id="new-build-form" onSubmit={handleSubmit}>
        <TextField
          value={newProject.title}
          className="form-input text-field"
          fullWidth
          id="form-title"
          onChange={handleInputChange}
          label="Project Title *"
          name="title"
        />
        {thumbNailImage}
        <Button
          className="large-button"
          id="upload-thumbnail-image"
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
          <input onChange={handleInputChange} type="text" id="tags" name="tags" />
        </label> */}
        <TextField
          value={newProject.appsAndPlatforms}
          className="form-input text-field"
          fullWidth
          id="apps-and-platforms"
          onChange={handleInputChange}
          label="Apps and platforms"
          name="appsAndPlatforms"
        />
        <Typography variant="h5" gutterBottom>
          Parts:
        </Typography>
        <div className="showpage-items-container">
          <div className="form-parts-list">{partsList}</div>
        </div>
        <div id="part-input-container">
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
        <label htmlFor="code" className="form-input" id="code-input">
          <Typography variant="h5" gutterBottom>
            Code:
          </Typography>
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
        <Typography id="github-url-explanation" variant="h5" gutterBottom>
          Is this a work in progress? Pasting the URL of your main sketch file on Github will
          automatically keep the code you share up to date.
        </Typography>
        <Typography id="github-example-url" variant="h6" gutterBottom>
          Example: https://github.com/antronyx/ServoTester/blob/main/main.ino
        </Typography>
        <TextField
          value={newProject.githubFileURL}
          fullWidth
          id="github-url"
          onChange={handleInputChange}
          label="GitHub main sketch file URL"
          name="githubFileURL"
        />
        <Typography variant="h5" gutterBottom>
          Add Instructions and Images:
        </Typography>
        {instructionList}
        <textarea
          value={instructionText}
          rows="5"
          cols="1"
          onChange={handleInstructionTextInput}
          type="text"
          id="instruction-text"
          name="instructionText"
        />
        <Button
          onClick={handleInstructionTextSubmit}
          className="large-button"
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
        <Button
          className="large-button"
          id="upload-image"
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
        <ErrorList errors={errors} id="form-error-list" />
        <Button
          type="submit"
          className="large-button"
          id="submit-form-button"
          variant="outlined"
          size="large"
          endIcon={<Send />}
        >
          Submit Project
        </Button>
      </form>
    </div>
  )
}

export default NewProjectForm
