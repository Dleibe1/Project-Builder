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
        <TextField
          value={newProject.thumbnailImageURL}
          className="form-input text-field"
          fullWidth
          id="thumbnail-url"
          name="thumbnailImageURL"
          onChange={handleInputChange}
          label="Thumbnail image url"
        />

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
        <TextField
          value={newProject.description}
          className="form-input text-field"
          fullWidth
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
          Project Images:
        </Typography>
        {imageList}
        <div className="form-input" id="image-url-input-container">
          <TextField
            fullWidth
            className="form-input text-field"
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
