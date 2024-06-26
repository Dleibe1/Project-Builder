import React, { useState, useEffect } from "react"
import { Redirect, useParams } from "react-router-dom"
import Dropzone from "react-dropzone"
import { Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import CloudUpload from "@mui/icons-material/CloudUpload"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"
import prepForFrontEnd from "../../services/prepForFrontEnd.js"

const ForkProjectForm = (props) => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [part, setPart] = useState("")
  const [image, setImage] = useState("")
  const [imageFile, setImageFile] = useState({
    image: {},
  })
  const params = useParams()
  const { id } = params

  useEffect(() => {
    getProject()
  }, [])

  const [forkedProject, setForkedProject] = useState({
    title: "",
    tags: "",
    appsAndPlatforms: "",
    images: [],
    parts: [],
    description: "Add a new description for your fork!",
    code: "",
    githubFileURL: "",
    userId: "",
    thumbnailImageURL: "",
  })

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
      setForkedProject({ ...fork, githubFileURL: "" })
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
      setForkedProject({ ...forkedProject, images: [...forkedProject.images, body.imageURL] })
    } catch (error) {
      console.error(`Error in uploadImage Fetch: ${error.message}`)
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

  const handleImageURLInput = (event) => {
    setImage(event.currentTarget.value)
  }

  const handlePartSubmit = () => {
    if (part.length) {
      setForkedProject({ ...forkedProject, parts: [...forkedProject.parts, part] })
    }
    setPart("")
  }

  const handleImageURLSubmit = () => {
    if (image.length) {
      setForkedProject({ ...forkedProject, images: [...forkedProject.images, image.trim()] })
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
    const partsList = forkedProject.parts.filter((part, i) => i !== index)
    setForkedProject({ ...forkedProject, parts: partsList })
  }

  const handleImageURLDelete = (index) => {
    const imageList = forkedProject.images.filter((image, i) => i !== index)
    setForkedProject({ ...forkedProject, images: imageList })
  }

  const partsList = forkedProject.parts.map((part, index) => {
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

  const imageList = forkedProject.images.map((image, index) => {
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
    <div className="new-build-form ">
      <h4>Fork This Build</h4>
      <ErrorList errors={errors} />
      <form key={"fork-project-form"} onSubmit={handleSubmit}>
        <label htmlFor="title">
          Name of project fork:
          <input
            onChange={handleInputChange}
            type="text"
            value={forkedProject.title}
            id="title"
            name="title"
          />
        </label>
        <label htmlFor="thumbnail-image-url">
          Thumbnail Image URL:
          <input
            value={forkedProject.thumbnailImageURL}
            onChange={handleInputChange}
            type="text"
            id="title"
            name="thumbnailImageURL"
          />
        </label>
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
            value={forkedProject.description}
            onChange={handleInputChange}
            type="text"
            id="description"
            name="description"
          />
        </label>
        <label htmlFor="code">
          Code:
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
        <label htmlFor="github-url">
          <h5>
            Is this a work in progress? Pasting the URL of your main sketch file on Github will
            automatically keep the code you share up to date.
          </h5>
          <h5>Example: https://github.com/antronyx/ServoTester/blob/main/main.ino</h5>
          Github main sketch file URL:
          <input
            value={forkedProject.githubFileURL}
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

export default ForkProjectForm
