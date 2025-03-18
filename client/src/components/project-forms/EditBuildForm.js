import React, { useState, useEffect } from "react"
import { Redirect, useParams } from "react-router-dom"
import Dropzone from "react-dropzone"
import { Button, TextField } from "@mui/material"
import Textarea from "@mui/joy/Textarea"
import { CloudUpload } from "@mui/icons-material"
import Send from "@mui/icons-material/Send"
import updateProject from "../../api/updateProject.js"
import uploadImageFile from "../../api/uploadImageFile.js"
import ErrorList from "./project-forms-shared/ErrorList.js"
import AddTags from "./project-forms-shared/AddTags.js"
import Instructions from "../shared/Instructions.js"
import InstructionsTinyMCEForm from "./project-forms-shared/InstructionsTinyMCEForm.js"
import PartsSubForm from "./project-forms-shared/PartsSubForm.js"
import getMyBuild from "../../api/getMyBuild.js"

const EditBuildForm = (props) => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

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
    window.scrollTo(0, 0)
    return () => {
      document.body.classList.remove("grey-background")
    }
  }, [])

  useEffect(() => {
    const fetchMyBuild = async () => {
      try {
        const myBuild = await getMyBuild(id)
        setProject(myBuild)
      } catch (error) {
        console.error("error in getMyBuild() Fetch: ", error)
      }
    }
    fetchMyBuild()
  }, [])

  const handleThumbnailImageUpload = async (acceptedImage) => {
    try {
      const imageURL = await uploadImageFile(acceptedImage)
      setProject((prevState) => ({
        ...prevState,
        thumbnailImage: imageURL,
      }))
    } catch (error) {
      console.error("Error in uploadProjectImage() Fetch: ", error)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await updateProject(project, id)
      setShouldRedirect(true)
    } catch (error) {
      if (error.serverErrors) {
        setErrors(error.serverErrors)
      } else {
        console.error("Error in updateProject Fetch: ", error)
      }
    }
  }

  const handleInputChange = (event) => {
    setProject({ ...project, [event.currentTarget.name]: event.currentTarget.value })
  }

  if (shouldRedirect) {
    return <Redirect push to={"/my-builds-list?page=1"} />
  }

  return !editingInstructions ? (
    <div className="edit-project-form-container project-show">
      <ErrorList errors={errors} />
      <form key="edit-build-form" id="edit-project-form" onSubmit={handleSubmit}>
        <div className="form-items-container top-section">
          <h1>Edit Project</h1>
          <section className="add-tags">
            <AddTags project={project} setProject={setProject} />
          </section>
          <TextField
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
        </div>
        <PartsSubForm project={project} setProject={setProject} />
        <Instructions project={project} setEditingInstructions={setEditingInstructions} />
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
