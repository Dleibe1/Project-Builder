import React, { useState } from "react"
import { Button, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

const PartsSubForm = ({ project, setProject }) => {
  const [part, setPart] = useState({ partName: "", partPurchaseURL: "" })

  const isValidHttpUrl = (string) => {
    let url
    try {
      url = new URL(string)
      console.log(url)
    } catch (_) {
      return false
    }
    return url.protocol === "http:" || url.protocol === "https:"
  }

  const handleInputChange = (event) => {
    setPart({ ...part, [event.currentTarget.name]: event.currentTarget.value })
  }

  const handlePartSubmit = () => {
    if (partName.trim().length) {
      setProject({
        ...project,
        parts: [
          ...project.parts,
          { partName: part.partName, partPurchaseURL: part.partPurchaseURL },
        ],
      })
      setPart({ partName: "", partPurchaseURL: "" })
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
          value={part.partName}
          onChange={handleInputChange}
          label="Enter new part"
          name="partName"
        />
        <TextField
          sx={{ width: "100%" }}
          id="part-purchase-url"
          className="part-purchase-url"
          value={part.partPurchaseURL}
          onChange={handleInputChange}
          label="Enter new part"
          name="partPurchaseURL"
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
