import React, { useState } from "react"

const NewProjectForm = (props) => {
  const [newProject, setNewProject] = useState({
    title: "",
    tags: "",
    appsAndPlatforms: "",
    parts: "",
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
      const responseData = response.json()
      console.log(responseData.project)
    } catch (error) {
      console.log(error)
    }
  }
  //SHOULD I MAKE ANOTHER SERIALIZER THAT ADDS THE userId?
  const handleSubmit = (event) => {
    event.preventDefault()
    postProject({ ...newProject, userId: props.user.id })
  }

  const handleInputChange = (event) => {
    setNewProject({ ...newProject, [event.currentTarget.name]: event.currentTarget.value })
  }

  return (
    <div className="new-build-form">
      <h4>Add a New Project</h4>
      <form onSubmit={handleSubmit}>
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
        <label htmlFor="parts">
          Parts Needed:
          <input onChange={handleInputChange} type="text" id="parts" name="parts" />
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
