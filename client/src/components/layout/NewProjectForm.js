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
import InstructionsSubForm from "./InstructionsSubForm.js"
import AddTagsToProjectForm from "./AddTagsToProjectForm.js"

const NewProjectForm = (props) => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [thumbnailImageFile, setThumbnailImageFile] = useState({
    image: {},
  })
  const [newPart, setNewPart] = useState("")
  const [project, setProject] = useState({
    title: "",
    tags: [],
    appsAndPlatforms: "",
    instructions: [{ instructionText: "" }],
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

  useEffect(() => {
    uploadThumbnailImage()
  }, [thumbnailImageFile])

  const postProject = async (newProjectData) => {
    try {
      const response = await fetch("/api/v1/projects/new-project", {
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

  const uploadThumbnailImage = async () => {
    const thumbnailImageFileData = new FormData()
    thumbnailImageFileData.append("image", thumbnailImageFile.image)
    try {
      const response = await fetch("/api/v1/image-upload", {
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
      setProject((prevState) => ({
        ...prevState,
        thumbnailImage: body.imageURL,
      }))
    } catch (error) {
      console.error(`Error in uploadProjectImage Fetch: ${error.message}`)
    }
  }

  const handleThumbnailImageUpload = (acceptedImage) => {
    setThumbnailImageFile({
      image: acceptedImage[0],
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postProject({
      ...project,
      userId: props.user.id,
      githubFileURL: project.githubFileURL?.trim(),
    })
  }

  const handleInputChange = (event) => {
    setProject({ ...project, [event.currentTarget.name]: event.currentTarget.value })
  }

  const handlePartInput = (event) => {
    setNewPart(event.currentTarget.value)
  }

  const handlePartSubmit = () => {
    if (newPart.trim().length) {
      setProject({
        ...project,
        parts: [...project.parts, { partName: newPart }],
      })
      setNewPart("")
    }
  }

  const handlePartDelete = (index) => {
    const partsList = project.parts.filter((part, i) => i !== index)
    setProject({ ...project, parts: partsList })
  }

  let thumbNailImage = [
    <div className="project-image-container thumbnail-image-container ">
      <img className="project-image" src={project.thumbnailImage} />
    </div>,
  ]

  thumbNailImage = project.thumbnailImage.length ? thumbNailImage : []

  const partsList = project.parts.map((part, index) => {
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

  if (shouldRedirect) {
    return <Redirect push to={"/my-builds-list?page=1"} />
  }

  return (
    <div className="fork-project-form-container project-show">
      <ErrorList errors={errors} />
      <form key="new-build-form" id="fork-project-form" onSubmit={handleSubmit}>
        <div className="form-items-container top-section">
          <h1>New Project</h1>
          <TextField
            value={project.title}
            className="form-input text-field"
            fullWidth
            id="form-title"
            onChange={handleInputChange}
            label="Project Title *"
            name="title"
          />
          <section className="add-tags">
            <AddTagsToProjectForm project={project} setProject={setProject} />
          </section>
          <h2>Description:</h2>
          <Textarea
            minRows={3}
            value={project.description}
            placeholder="Enter description"
            onChange={handleInputChange}
            name="description"
            label="Enter Project Description"
            sx={{ minWidth: "100%", backgroundColor: "white" }}
          />
          <div className="project-image-container thumbnail-image-container">
            <img className="project-image" src={project.thumbnailImage} />
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
                    {project.thumbnailImage.length > 0
                      ? "Change Thumbnail Image"
                      : "Upload Thumbnail Image"}
                  </div>
                </section>
              )}
            </Dropzone>
          </Button>
          <TextField
            value={project.appsAndPlatforms}
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
            value={newPart}
            onChange={handlePartInput}
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
        <InstructionsSubForm project={project} setProject={setProject} />
        <div className="form-items-container">
          <h2 className="code-heading">Code:</h2>
          <label htmlFor="code" className="form-input" id="code-input">
            <Textarea
              value={project.code}
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
          <h3 id="github-url-explanation">
            Is this a work in progress? Pasting the URL of your main sketch file on Github will
            automatically keep the code you share up to date.
          </h3>
          <p id="github-example-url">
            Example: https://github.com/antronyx/ServoTester/blob/main/main.ino
          </p>
          <TextField
            value={project.githubFileURL}
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
