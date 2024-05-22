import React, { useState, useEffect } from "react"
import { Redirect, useParams } from "react-router-dom"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"

const EditBuildForm = (props) => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [part, setPart] = useState("")
  const [image, setImage] = useState("")
  const params = useParams()
  const { id } = params

  useEffect(() => {
    getProject()
  }, [])

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
      for (let [key, value] of Object.entries(build)) {
        if (value === null) {
          build[key] = '';
        }
      }
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

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(editedProject)  Sending correct data
    updateProject(editedProject)
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
      setEditedProject({ ...editedProject, images: [...editedProject.images, image] })
    }
    setImage("")
  }

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
      <div id="parts-list" className="cell small-3 medium-6 large-4">
        <h5 id="part">{part}</h5>
        <p id="delete-part" onClick={() => handlePartDelete(index)} className="part-button ">
          Delete Part
        </p>
      </div>
    )
  })

  const imageList = editedProject.images.map((image, index) => {
    return (
      <div id="image-list">
        <img id="image-list-project-form" src={image} />
        <button id="delete-image" onClick={() => handleImageURLDelete(index)}>
          Delete image
        </button>
      </div>
    )
  })

  if (shouldRedirect) {
    return <Redirect push to={"/my-builds"} />
  }

  return (
    <div className="new-build-form ">
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
        <label htmlFor="tags">
          Tags:
          <input
            value={editedProject.tags}
            onChange={handleInputChange}
            type="text"
            id="tags"
            name="tags"
          />
        </label>
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
          <h3 onClick={handlePartSubmit} className="part-button">
            Add Part
          </h3>
        </label>
        <label htmlFor="description">
          description:
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
            Is this a work in progress?  Pasting the URL of your main sketch file on Github will automatically
            keep the code you share up to date.
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
          <input onChange={handleImageURLInput} type="text" id="image-url" name="image" />
          <h3 onClick={handleImageURLSubmit} className="part-button">
            Add Image URL
          </h3>
        </label>
        <input type="submit" value="Submit Project" />
      </form>
    </div>
  )
}

export default EditBuildForm
