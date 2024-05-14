import React, { useState } from "react"
import ErrorList from "./ErrorList"

const NewProjectForm = (props) => {
  const [newProject, setNewProject] = useState({})

  //ADD ERRORLIST
  return(
    <div>
      <h4>Add a New Project</h4>
     
    </div>
  )
}

export default NewProjectForm


// required: ["title", "parts", "description", "code"],
// properties: {
//   userId: { type: "integer" },
//   title: { type: "string", minLength: 1 },
//   parts: { type: "string", minLength: 1 },
//   appsAndPlatforms: { type: "string" },
//   tags: { type: "string" },
//   description: { type: "string", minLength: 1 },
//   documentation: { type: "string" },
//   code: { type: "string", minLength: 1 },