import React, { useState, useEffect } from "react"
import { Redirect, useParams } from "react-router-dom"
import Dropzone from "react-dropzone"
import { Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import CloudUpload from "@mui/icons-material/CloudUpload"
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
    thumbnailImageURL: "",
  })

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
      setEditedProject({ ...editedProject, images: [...editedProject.images, body.imageURL] })
    } catch (error) {
      console.error(`Error in uploadImage Fetch: ${error.message}`)
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

  const handleImageUpload = (acceptedImage) => {
    setImageFile({
      image: acceptedImage[0],
    })
  }

  useEffect(() => {
    uploadImage()
  }, [imageFile])

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
    );
  });

  const imageList = editedProject.images.map((image, index) => {
    return (
      <div id="image-list">
        <img id="image-list-project-form" src={image} />
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
    <div className="new-build-form">
      <h4>Edit Build</h4>
      <ErrorList errors={errors} />
      <form key={"edit-build-form"} onSubmit={handleSubmit}>
        <label htmlFor="title">
          Name of project:
          <input
            value={editedProject.title}
            onChange={handleInputChange}
            type="text"
            id="title"
            name="title"
          />
        </label>
        <label htmlFor="thumbnail-image-url">
          Thumbnail Image URL:
          <input
            value={editedProject.thumbnailImageURL}
            onChange={handleInputChange}
            type="text"
            id="title"
            name="thumbnailImageURL"
          />
        </label>
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
        <label htmlFor="apps-and-platforms">
          Apps and Platforms:
          <input
            onChange={handleInputChange}
            type="text"
            id="apps-and-platforms"
            name="appsAndPlatforms"
          />
        </label>
        <h5>Parts:</h5>
        {partsList}
        <label htmlFor="part">
          <input value={part} onChange={handlePartInput} type="text" id="parts" name="part" />
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
        <label htmlFor="description">
          Description:
          <input
            value={editedProject.description}
            onChange={handleInputChange}
            type="text"
            id="description"
            name="description"
          />
        </label>
        <label htmlFor="code">
          Code:
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
        <label htmlFor="github-url">
          <h5>
            Is this a work in progress? Pasting the URL of your main sketch file on Github will
            automatically keep the code you share up to date.
          </h5>
          <h5>Example: https://github.com/antronyx/ServoTester/blob/main/main.ino</h5>
          Github main sketch file URL:
          <input
            value={editedProject.githubFileURL}
            onChange={handleInputChange}
            type="text"
            id="github-url"
            name="githubFileURL"
          />
        </label>
        {imageList}
        <label htmlFor="image">
          Add Image URL:
          <input
            value={image}
            onChange={handleImageURLInput}
            type="text"
            id="image-url"
            name="image"
          />
          <Button
            onClick={handleImageURLSubmit}
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
            Add Image URL
          </Button>
        </label>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
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
                  Upload Image
                </Button>
              </div>
            </section>
          )}
        </Dropzone>
        <input type="submit" value="Submit Project" />
      </form>
      <ErrorList errors={errors} />
    </div>
  )
}

export default EditBuildForm
