import React, { useState } from "react"
import { Button, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

const PartsSubForm = ({ project, setProject }) => {
  const [part, setPart] = useState({ partName: "", partPurchaseURL: "" })
  const isValidHttpUrl = (string) => {
    let url
    try {
      url = new URL(string)
    } catch (_) {
      return false
    }
    return url.protocol === "http:" || url.protocol === "https:"
  }

  const handleInputChange = (event) => {
    setPart({ ...part, [event.currentTarget.name]: event.currentTarget.value })
  }

  const handlePartSubmit = () => {
    const urlProvided = part.partPurchaseURL.trim().length > 0
    const partNameProvided = part.partName.trim().length > 0
    const urlIsValid = isValidHttpUrl(part.partPurchaseURL.trim())
    if ((urlProvided && urlIsValid && partNameProvided) || (!urlProvided && partNameProvided)) {
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
      <div
        data-cy="part-item-in-form"
        key={`${part.partName} ${part.partPurchaseURL || ""} ${index}`}
        className="part-item-in-form"
      >
        {part.partPurchaseURL.length === 0 && (
          <p data-cy="part-text-no-purchase-link" className="part-without-purchase-link">
            {part.partName}
          </p>
        )}
        {part.partPurchaseURL.length > 0 && (
          <a
            data-cy="purchase-link"
            target="_blank"
            rel="noopener noreferrer"
            href={part.partPurchaseURL}
          >
            <div className="part-with-purchase-link">
              <p data-cy="part-text-in-purchase-link">{part.partName}</p>
              <ShoppingCartIcon fontSize="large" />
            </div>
          </a>
        )}
        <Button
          data-cy="delete-part-button"
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
    <div className="form-items-container parts-sub-form">
      <h2 id="parts-heading-form">Parts:</h2>
      <div data-cy="form-parts-list" className="form-parts-list">
        {partsList}
      </div>
      <div
        data-cy="form-part-input-container"
        id="part-input-container"
        className="form-items-container"
      >
        <TextField
          inputProps={{ "data-cy": "partname-input" }}
          sx={{ width: "100%" }}
          className="part-name-input"
          value={part.partName}
          onChange={handleInputChange}
          label="Enter new part"
          name="partName"
        />
        <TextField
          inputProps={{"data-cy": "part-purchase-url-input"}}
          sx={{ width: "100%" }}
          className="part-purchase-url-input"
          value={part.partPurchaseURL}
          onChange={handleInputChange}
          label="Purchase URL for Part (optional)"
          name="partPurchaseURL"
        />
        <section className="part-submit">
          <Button
            data-cy="submit-part-button"
            onClick={handlePartSubmit}
            id="add-part-button"
            variant="contained"
          >
            Add Part
          </Button>
          {isValidHttpUrl(part.partPurchaseURL.trim()) === false &&
            part.partPurchaseURL.trim().length > 0 && (
              <p data-cy="invalid-url-message" className="url-invalid">
                Not a valid URL, make sure to include <strong>http://</strong> or{" "}
                <strong>https://</strong>
              </p>
            )}
        </section>
      </div>
    </div>
  )
}

export default PartsSubForm
