import React, { useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { Button, TextField } from "@mui/material"

const PartsSubForm = ({ project, setProject }) => {
  const [newPart, setNewPart] = useState("")
  const handleInputChange = (event) => {
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
  return (
    <>
      <h2 id="parts-heading-form">Parts:</h2>
      {project.parts.length > 0 && (
        <div className="form-parts-list form-items-container">{partsList}</div>
      )}
      <div id="part-input-container" className="form-items-container">
        <TextField
          sx={{ width: "100%" }}
          id="part"
          className="part"
          value={newPart}
          onChange={handleInputChange}
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
    </>
  )
}

export default PartsSubForm