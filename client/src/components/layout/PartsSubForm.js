import React from "react"
import React, { useState } from "react"

const PartsSubForm = (props) => {
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

  const partsList = project.parts.map((part, index) => {
    return (
      <div key={`${part.partName}${index}`} className="part-item-in-form">
        <p> {part.partName}</p>
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
    <div className="form-items-container top-section">
      <h2 id="parts-heading-form">Parts:</h2>
      <div className="form-parts-list">{partsList}</div>
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
    </div>
  )
}

export default PartsSubForm
