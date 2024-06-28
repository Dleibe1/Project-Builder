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
  const [image, setImage] = useState("")
  const [imageFile, setImageFile] = useState({
    image: {},
  })
  const [newProject, setNewProject] = useState({
    title: "",
    tags: "",
    appsAndPlatforms: "",
    images: [],
    parts: [],
    description: "",
    code: "",
    githubFileURL: "",
    userId: "",
    thumbnailImageURL: "",
  })

  const uploadImage = async () => {
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
      setNewProject({ ...newProject, images: [...newProject.images, body.imageURL] })
    } catch (error) {
      console.error(`Error in uploadImage Fetch: ${error.message}`)
    }
  }

  const handleImageUpload = (acceptedImage) => {
    setImageFile({
      image: acceptedImage[0],
    })
  }

  useEffect(() => {
    uploadImage()
  }, [imageFile])

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

  const handleImageURLInput = (event) => {
    setImage(event.currentTarget.value)
  }

  const handlePartSubmit = () => {
    if (part.length) {
      setNewProject({ ...newProject, parts: [...newProject.parts, part] })
    }
    setPart("")
  }

  const handleImageURLSubmit = () => {
    if (image.length) {
      setNewProject({ ...newProject, images: [...newProject.images, image.trim()] })
    }
    setImage("")
  }

  const handlePartDelete = (index) => {
    const partsList = newProject.parts.filter((part, i) => i !== index)
    setNewProject({ ...newProject, parts: partsList })
  }

  const handleImageURLDelete = (index) => {
    const imageList = newProject.images.filter((image, i) => i !== index)
    setNewProject({ ...newProject, images: imageList })
  }

  const partsList = newProject.parts.map((part, index) => {
    return (
      <div key={`${part}${index}`} id="parts-list" className="cell small-3 medium-6 large-4">
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

  const imageList = newProject.images.map((imageURL, index) => {
    return (
      <div id="image-list">
        <img id="image-list-project-form" src={imageURL} />
        <Button
          onClick={() => handleImageURLDelete(index)}
          className="large-button"
          id="delete-image"
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
    <div className="new-build-form-container">
      <Typography variant="h3" gutterBottom>
        Create New Project
      </Typography>
      <ErrorList errors={errors} />
      <form id="new-build-form" onSubmit={handleSubmit}>
        <label htmlFor="form-title" className="form-input">
          <Typography variant="h5" gutterBottom>
            Project Title:
          </Typography>
          <TextField
            fullWidth
            id="form-title"
            onChange={handleInputChange}
            label="Project Title *"
            name="title"
          />
        </label>
        <label htmlFor="thumbnail-url" className="form-input">
          <Typography variant="h5" gutterBottom>
            Thumbnail image url:
          </Typography>
          <TextField
            fullWidth
            id="thumbnail-url"
            name="thumbnailImageURL"
            onChange={handleInputChange}
            label="Thumbnail image url"
          />
        </label>
        {/* <label htmlFor="tags">
          Tags:
          <input onChange={handleInputChange} type="text" id="tags" name="tags" />
        </label> */}
        <label htmlFor="apps-and-platforms" className="form-input">
          <Typography variant="h5" gutterBottom>
            Apps and platforms:
          </Typography>
          <TextField
            fullWidth
            id="apps-and-platforms"
            onChange={handleInputChange}
            label="Apps and platforms"
            name="appsAndPlatforms"
          />
        </label>
        <label htmlFor="description" className="form-input">
          <Typography variant="h5" gutterBottom>
            Description and instructions:
          </Typography>
          <TextField
            fullWidth
            id="description"
            name="description"
            onChange={handleInputChange}
            label="Description and instructions"
          />
        </label>
        <Typography variant="h5" gutterBottom>
          Parts:
        </Typography>
        {partsList}
        <label htmlFor="part" id="part-input-container">
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
        </label>
        <label htmlFor="code" className="form-input" id="code-input">
          <Typography variant="h5" gutterBottom>
            Code:
          </Typography>
          <textarea
            rows="20"
            cols="1"
            onChange={handleInputChange}
            type="text"
            id="code"
            name="code"
          />
        </label>
        <label htmlFor="github-url">
          <h5>
            Is this a work in progress? Pasting the URL of your main sketch file on Github will
            automatically keep the code you share up to date.
          </h5>
          <Typography id="github-example-url" variant="h6" gutterBottom>
            Example: https://github.com/antronyx/ServoTester/blob/main/main.ino
          </Typography>
          <Typography variant="h5" gutterBottom>
            GitHub main sketch file URL:
          </Typography>
          <TextField
            fullWidth
            id="github-url"
            onChange={handleInputChange}
            label="GitHub main sketch file URL"
            name="githubFileURL"
          />
        </label>
        <Typography variant="h5" gutterBottom>
          Project Images:
        </Typography>
        {imageList}
        <label htmlFor="image" className="form-input" id="image-url-input-container">
          <TextField
            fullWidth
            id="image-url"
            value={image}
            onChange={handleImageURLInput}
            label="Image URL"
            name="image"
          />
          <Button
            onClick={handleImageURLSubmit}
            className="large-button"
            id="add-image"
            variant="contained"
            sx={{
              "&:hover": {
                textDecoration: "none",
                color: "white",
              },
            }}
          >
            Add Image URL
          </Button>
        </label>
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
          <Dropzone onDrop={handleImageUpload}>
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

export default NewProjectForm