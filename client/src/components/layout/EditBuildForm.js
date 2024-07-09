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

const EditBuildForm = (props) => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [part, setPart] = useState("")
  const [image, setImage] = useState("")
  const [imageFile, setImageFile] = useState({
    image: {},
  })
  const [thumbnailImageFile, setThumbnailImageFile] = useState({
    image: {},
  })
  const params = useParams()
  const { id } = params

  const [editedProject, setEditedProject] = useState({
    title: "",
    tags: "",
    appsAndPlatforms: "",
    images: [],
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
      setEditedProject({ ...editedProject, images: [...editedProject.images, body.imageURL] })
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

  const getProject = async () => {
    try {
      const response = await fetch(`/api/v1/my-builds/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      let build = responseBody.userBuild
      prepForFrontEnd(build)
      setEditedProject(build)
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

  useEffect(() => {
    getProject()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    updateProject({ ...editedProject, githubFileURL: editedProject.githubFileURL.trim() })
  }

  const handleInputChange = (event) => {
    setEditedProject({ ...editedProject, [event.currentTarget.name]: event.currentTarget.value })
  }

  const handlePartInput = (event) => {
    setPart(event.currentTarget.value)
  }

  const handleImageURLInput = (event) => {
    setImage(event.currentTarget.value)
  }

  const handlePartSubmit = () => {
    if (part.length) {
      setEditedProject({ ...editedProject, parts: [...editedProject.parts, part] })
    }
    setPart("")
  }

  const handleImageURLSubmit = () => {
    if (image.length) {
      setEditedProject({ ...editedProject, images: [...editedProject.images, image.trim()] })
    }
    setImage("")
  }

  useEffect(() => {
    uploadProjectImage()
  }, [imageFile])

  useEffect(() => {
    uploadThumbnailImage()
  }, [thumbnailImageFile])

  const handlePartDelete = (index) => {
    const partsList = editedProject.parts.filter((part, i) => i !== index)
    setEditedProject({ ...editedProject, parts: partsList })
  }

  const handleImageURLDelete = (index) => {
    const imageList = editedProject.images.filter((image, i) => i !== index)
    setEditedProject({ ...editedProject, images: imageList })
  }

  const partsList = editedProject.parts.map((part, index) => {
    return (
      <div key={`${part}${index}`} className="cell small-3 medium-6 large-4 parts-list">
        <h5 className="part-title">{part}</h5>
        <Button
          onClick={() => handlePartDelete(index)}
          className="large-button"
          id="delete-part"
          variant="contained"
          sx={{
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

  const imageList = editedProject.images.map((imageURL, index) => {
    return (
      <div key={`${imageURL}${index}`} className="image-list-container">
        <img className="project-image" src={imageURL} />
        <Button
          onClick={() => handleImageURLDelete(index)}
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
  })

  if (shouldRedirect) {
    return <Redirect push to={"/my-builds"} />
  }

  return (
    <div className="edit-project-form-container">
      <Typography variant="h3" gutterBottom>
        Edit Project
      </Typography>
      <ErrorList errors={errors} />
      <form key="new-build-form" id="new-build-form" onSubmit={handleSubmit}>
        <TextField
          value={editedProject.title}
          className="form-input text-field"
          fullWidth
          id="form-title"
          onChange={handleInputChange}
          label="Project Title *"
          name="title"
        />
        <div className="image-list-container">
          <img className="project-image" src={editedProject.thumbnailImage} />
        </div>
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
            value={editedProject.tags}
            onChange={handleInputChange}
            type="text"
            id="tags"
            name="tags"
          />
        </label> */}
        <TextField
          value={editedProject.appsAndPlatforms}
          className="form-input text-field"
          fullWidth
          id="apps-and-platforms"
          onChange={handleInputChange}
          label="Apps and platforms"
          name="appsAndPlatforms"
        />
        <TextField
          value={editedProject.description}
          multiline
          className="form-input text-field"
          id="description"
          name="description"
          onChange={handleInputChange}
          label="Description and instructions"
        />
        <Typography variant="h5" gutterBottom>
          Parts:
        </Typography>
        {partsList}
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
            value={editedProject.code}
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
          value={editedProject.githubFileURL}
          fullWidth
          id="github-url"
          onChange={handleInputChange}
          label="GitHub main sketch file URL"
          name="githubFileURL"
        />
        <Typography variant="h5" gutterBottom>
          Project Images:
        </Typography>
        {imageList}
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
                  Upload Image File
                </div>
              </section>
            )}
          </Dropzone>
        </Button>
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

export default EditBuildForm
