import React, { useState } from "react"

const NewProjectForm = (props) => {
  const [part, setPart] = useState("")
  const [newProject, setNewProject] = useState({
    title: "",
    tags: "",
    appsAndPlatforms: "",
    parts: [],
    description: "",
    code: "",
    userId: "",
  })

  const postProject = async (newProjectData) => {
    try {
      const response = await fetch(`/api/v1/projects`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newProjectData),
      })
      if (!response.ok) {
        const newError = new Error("Error in the fetch!")
        throw newError
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postProject({ ...newProject, userId: props.user.id })
  }

  const handleInputChange = (event) => {
    setNewProject({ ...newProject, [event.currentTarget.name]: event.currentTarget.value })
  }

  const handlePartInput = (event) => {
    setPart(event.currentTarget.value)
  }

  const handlePartSubmit = () => {
    if (part.length) {
      setNewProject({ ...newProject, parts: [...newProject.parts, part] })
    }
    setPart("")
  }

  const handleDelete = (index) => {
    const partsList = newProject.parts.filter((part, i) => i !== index)
    setNewProject({ ...newProject, parts: partsList })
  }

  const partsList = newProject.parts.map((part, index) => {
    return (
      <div id="parts-list" className="cell small-3 medium-6 large-4r">
        <h5 id="part">{part}</h5>
        <p id="delete-part" onClick={() => handleDelete(index)} className="part-button ">
          Delete Part
        </p>
      </div>
    )
  })

  return (
    <div className="new-build-form ">
      <h4>Add a New Project</h4>
      <form key={"new-build-form"} onSubmit={handleSubmit}>
        <label htmlFor="title">
          Name of project:
          <input onChange={handleInputChange} type="text" id="title" name="title" />
        </label>
        <label htmlFor="tags">
          Tags:
          <input onChange={handleInputChange} type="text" id="tags" name="tags" />
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
          <input onChange={handleInputChange} type="text" id="description" name="description" />
        </label>
        <label htmlFor="code">
          Code:
          <input onChange={handleInputChange} type="text" id="code" name="code" />
        </label>
        <input type="submit" value="Submit Project" />
      </form>
    </div>
  )
}

export default NewProjectForm
