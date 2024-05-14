import React, { useState } from "react"
import ErrorList from "./ErrorList"

const NewProjectForm = (props) => {
  const [newProject, setNewProject] = useState({})

  return (
    <div className="new-build-form">
      <h4>Add a New Project</h4>
      <form>
        <label htmlFor="title">
          Name of project:
          <input type="text" id="title" name="title" />
        </label>
        <label htmlFor="tags">
          Tags:
          <input type="text" id="tags" name="tags" />
        </label>
        <label htmlFor="apps-and-platforms">
          Apps and Platforms:
          <input type="text" id="apps-and-platforms" name="apps-and-platforms" />
        </label>
        <label htmlFor="parts">
          Parts Needed:
          <input type="text" id="parts" name="parts" />
        </label>
        <label htmlFor="description">
          description:
          <input type="text" id="description" name="description" />
        </label>
        <label htmlFor="code">
          Code:
          <input type="text" id="code" name="code" />
        </label>
      </form>
    </div>
  )
}

export default NewProjectForm
