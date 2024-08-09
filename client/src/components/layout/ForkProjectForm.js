import React, { useState, useEffect } from "react"
import { Redirect, useParams } from "react-router-dom"
import Dropzone from "react-dropzone"
import { Button, TextField, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import CloudUpload from "@mui/icons-material/CloudUpload"
import Send from "@mui/icons-material/Send"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"
import prepForFrontEnd from "../../services/prepForFrontEnd.js"

const ForkProjectForm = (props) => {
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
  const params = useParams()
  const { id } = params

  useEffect(() => {
    getProject()
  }, [])

  const [forkedProject, setForkedProject] = useState({
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
      setForkedProject({ ...forkedProject, images: [...forkedProject.images, body.imageURL] })
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
      setForkedProject({ ...forkedProject, thumbnailImage: body.imageURL })
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

  const handleInstructionTextInput = (event) => {
    setInstructionText(event.currentTarget.value)
  }

  const handleInstructionTextSubmit = () => {
    if (instructionText.length) {
      setForkedProject({
        ...forkedProject,
        instructions: [...forkedProject.instructions, { instructionText: instructionText }],
      })
    }
    setInstructionText("")
  }

  const handleInstructionDelete = (index) => {
    const instructionList = forkedProject.instructions.filter((instruction, i) => i !== index)
    setForkedProject({ ...forkedProject, instructions: instructionList })
  }

  const getProject = async () => {
    try {
      const response = await fetch(`/api/v1/project-forks/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      let fork = responseBody.fork
      prepForFrontEnd(fork)
      setForkedProject(fork)
    } catch (error) {
      console.log(error)
    }
  }

  const postForkedProject = async (forkedProjectData) => {
    try {
      const response = await fetch(`/api/v1/project-forks/${id}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(forkedProjectData),
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
    postForkedProject({ ...forkedProject, githubFileURL: forkedProject.githubFileURL.trim() })
  }

  const handleInputChange = (event) => {
    setForkedProject({ ...forkedProject, [event.currentTarget.name]: event.currentTarget.value })
  }

  const handlePartInput = (event) => {
    setPart(event.currentTarget.value)
  }

  const handlePartSubmit = () => {
    if (part.length) {
      setForkedProject({ ...forkedProject, parts: [...forkedProject.parts, { partName: part }] })
    }
    setPart("")
  }

  useEffect(() => {
    uploadProjectImage()
  }, [imageFile])

  useEffect(() => {
    uploadThumbnailImage()
  }, [thumbnailImageFile])

  const handlePartDelete = (index) => {
    const partsList = forkedProject.parts.filter((part, i) => i !== index)
    setForkedProject({ ...forkedProject, parts: partsList })
  }

  const handleImageURLDelete = (index) => {
    const imageList = forkedProject.images.filter((image, i) => i !== index)
    setForkedProject({ ...forkedProject, images: imageList })
  }

  const partsList = forkedProject.parts.map((part, index) => {
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

  const instructionList = forkedProject.instructions.map((instruction, index) => {
    if (instruction.imageURL) {
      return (
        <div key={`${instruction.imageURL}${index}`} className="project-image-container">
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
    } else {
      return (
        <div key={`${instruction.instructionText}${index}`} className="instruction-container">
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

  console.log(forkedProject)

  if (shouldRedirect) {
    return <Redirect push to={"/my-builds"} />
  }

  return (
    <div className="fork-project-form-container">
      <Typography variant="h3" gutterBottom>
        Fork This Project
      </Typography>
      <ErrorList errors={errors} />
      <form key="new-build-form" id="fork-project-form" onSubmit={handleSubmit}>
        <TextField
          value={forkedProject.title}
          className="form-input text-field"
          fullWidth
          id="form-title"
          onChange={handleInputChange}
          label="Project Title *"
          name="title"
        />
        <Typography variant="h5" gutterBottom>
          Description:
        </Typography>
        <textarea
          value={forkedProject.description}
          rows="10"
          cols="1"
          onChange={handleInputChange}
          type="text"
          id="description"
          name="description"
        />
        <div className="project-image-container">
          <img className="project-image" src={forkedProject.thumbnailImage} />
        </div>
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
                  Change Thumbnail Image
                </div>
              </section>
            )}
          </Dropzone>
        </Button>
        {/* <label htmlFor="tags">
          Tags:
          <input
            value={forkedProject.tags}
            onChange={handleInputChange}
            type="text"
            id="tags"
            name="tags"
          />
        </label> */}
        <TextField
          value={forkedProject.appsAndPlatforms}
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
            value={forkedProject.code}
            rows="20"
            cols="1"
            onChange={handleInputChange}
            type="text"
            id="code"
            name="code"
          />
        </label>
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
        <Typography id="github-url-explanation" variant="h5" gutterBottom>
          Is this a work in progress? Pasting the URL of your main sketch file on Github will
          automatically keep the code you share up to date.
        </Typography>
        <Typography id="github-example-url" variant="h6" gutterBottom>
          Example: https://github.com/antronyx/ServoTester/blob/main/main.ino
        </Typography>
        <TextField
          value={forkedProject.githubFileURL}
          fullWidth
          id="github-url"
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
      </form>
    </div>
  )
}

export default ForkProjectForm
