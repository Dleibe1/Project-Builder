import React, { useState, useEffect } from "react"
import { Redirect, useParams } from "react-router-dom"
import { useDropzone } from "react-dropzone"
import { Button, TextField } from "@mui/material"
import Textarea from "@mui/joy/Textarea"
import { CloudUpload } from "@mui/icons-material"
import Send from "@mui/icons-material/Send"
import updateProject from "../../api/updateProject.js"
import uploadImageFile from "../../api/uploadImageFile.js"
import ErrorList from "./project-forms-shared/ErrorList.js"
import AddTags from "./project-forms-shared/AddTags.js"
import Loading from "../shared/Loading.js"
import Instructions from "../shared/Instructions.js"
import InstructionsTinyMCEForm from "./project-forms-shared/InstructionsTinyMCEForm.js"
import PartsSubForm from "./project-forms-shared/PartsSubForm.js"
import getMyBuild from "../../api/getMyBuild.js"

const EditBuildForm = (props) => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState({
    title: "",
    tags: [],
    appsAndPlatforms: "",
    instructions: "",
    parts: [],
    description: "",
    code: "",
    githubFileURL: "",
    userId: "",
    thumbnailImage: "",
  })

  const [editingInstructions, setEditingInstructions] = useState(false)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    document.body.classList.add("grey-background")
    return () => {
      document.body.classList.remove("grey-background")
    }
  }, [])

  useEffect(() => {
    getMyBuild(id).then((myBuild) => {
      setProject(myBuild)
      setLoading(false)
    })
  }, [])

  const handleThumbnailImageUpload = (acceptedImage) => {
    uploadImageFile(acceptedImage)
      .then((imageURL) => {
        setProject((prevState) => ({
          ...prevState,
          thumbnailImage: imageURL,
        }))
      })
      .catch((error) => {
        console.error("Error uploading thumbnail image: ", error)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateProject(project, id)
      .then(() => {
        setShouldRedirect(true)
      })
      .catch((error) => {
        if (error.serverErrors) {
          setErrors(error.serverErrors)
        } else {
          console.error("Error in updateProject Fetch: ", error)
        }
      })
  }

  const handleInputChange = (event) => {
    setProject({ ...project, [event.currentTarget.name]: event.currentTarget.value })
  }

  const { getInputProps, getRootProps, open } = useDropzone({
    onDrop: handleThumbnailImageUpload,
    noClick: true,
    noKeyboard: true,
  })

  if (shouldRedirect) {
    return <Redirect push to={"/my-builds-list?page=1"} />
  }
  if (loading) {
    return <Loading />
  }

  return !editingInstructions ? (
    <div className="edit-project-form-container project-show">
      <ErrorList errors={errors} />
      <form data-cy="edit-project-form" id="edit-project-form" onSubmit={handleSubmit}>
        <div className="form-items-container top-section">
          <h1 data-cy="edit-project-main-heading">Edit Project</h1>
          <section className="add-tags">
            <AddTags project={project} setProject={setProject} />
          </section>
          <TextField
            inputProps={{ "data-cy": "edit-project-title-input" }}
            value={project.title}
            className="form-input text-field"
            fullWidth
            id="form-title"
            onChange={handleInputChange}
            label="Project Title *"
            name="title"
          />
          <h2>Description:</h2>
          <Textarea
            slotProps={{ textarea: { "data-cy": "edit-project-description-input" } }}
            minRows={3}
            value={project.description}
            placeholder="Enter description"
            onChange={handleInputChange}
            name="description"
            label="Enter Project Description"
            sx={{ minWidth: "100%", backgroundColor: "white" }}
          />
          <div className="project-image-container thumbnail-image-container">
            <img data-cy="thumbnail-image" className="project-image" src={project.thumbnailImage} />
          </div>
          <div {...getRootProps()} style={{ display: "none" }}>
            <input data-cy="thumbnail-upload-input" {...getInputProps()} />
          </div>
          <Button
            data-cy="upload-thumbnail-button"
            className="large-button change-thumbnail-image"
            variant="contained"
            startIcon={<CloudUpload />}
            onClick={open}
          >
            Change Thumbnail Image
          </Button>
          <TextField
            inputProps={{ "data-cy": "apps-and-platforms-input" }}
            value={project.appsAndPlatforms}
            className="form-input text-field"
            fullWidth
            onChange={handleInputChange}
            label="Apps and platforms"
            name="appsAndPlatforms"
          />
        </div>
        <PartsSubForm project={project} setProject={setProject} />
        <Instructions project={project} setEditingInstructions={setEditingInstructions} />
        <div className="form-items-container">
          <h2 className="code-heading">Code:</h2>
          <label htmlFor="code" className="form-input" id="code-input">
            <Textarea
              slotProps={{ textarea: { "data-cy": "code-input" } }}
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
            inputProps={{ "data-cy": "github-file-url" }}
            value={project.githubFileURL || undefined}
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
  ) : (
    <InstructionsTinyMCEForm
      project={project}
      setProject={setProject}
      setEditingInstructions={setEditingInstructions}
    />
  )
}

export default EditBuildForm
