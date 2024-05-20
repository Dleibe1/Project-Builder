import React, { useState,  } from "react"
import { Redirect, useLocation } from "react-router-dom"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"

const EditBuildForm = (props) => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [part, setPart] = useState("")
  const location = useLocation()
  const { myBuild } = location.state || {}
  const partNames = myBuild.parts.map((part) => {
    return part.partName
  })
  const [editedProject, setEditedProject] = useState({
    title: myBuild?.title || "",
    tags: myBuild?.tags || "",
    appsAndPlatforms: myBuild?.appsAndPlatforms || "",
    parts: partNames || [],
    description: myBuild?.description || "",
    code: myBuild?.code || "",
    userId: props.user?.id || "",
    thumbnailImageURL: myBuild?.thumbnailImageURL || "",
    githubFileURL: myBuild?.githubFileURL || ""
  })


  const updateProject = async (editedProjectData) => {
    try {
      const response = await fetch(`/api/v1/projects/${myBuild.id}`, {
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

  console.log(editedProject)

  const handleSubmit = (event) => {
    event.preventDefault()
    updateProject(editedProject)
  }

  const handleInputChange = (event) => {
    setEditedProject({ ...editedProject, [event.currentTarget.name]: event.currentTarget.value })
  }

  const handlePartInput = (event) => {
    setPart(event.currentTarget.value)
  }

  const handlePartSubmit = () => {
    if (part.length) {
      setEditedProject({ ...editedProject, parts: [...editedProject.parts, part] })
    }
    setPart("")
  }

  const handlePartDelete = (index) => {
    const partsList = editedProject.parts.filter((part, i) => i !== index)
    setEditedProject({ ...editedProject, parts: partsList })
  }

  console.log(editedProject)

  const partsList = editedProject.parts.map((part, index) => {
    return (
      <div id="parts-list" className="cell small-3 medium-6 large-4r">
        <h5 id="part">{part}</h5>
        <p id="delete-part" onClick={() => handlePartDelete(index)} className="part-button ">
          Delete Part
        </p>
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
            Alternatively, pasting the URL of your main sketch file on Github will automatically
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
        <input type="submit" value="Submit Project" />
      </form>
    </div>
  )
}

export default EditBuildForm
