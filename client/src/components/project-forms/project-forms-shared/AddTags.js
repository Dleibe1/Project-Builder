import React from "react"
import { TextField } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import allowedTags from "../../../../../shared/allowedTags"

const AddTags = ({ project, setProject }) => {
  const handleTagsChange = (event, value) => {
    const chosenTagNames = value
    const projectTags = chosenTagNames.map((tagName) => {
      return { tagName }
    })
    setProject((prevState) => ({
      ...prevState,
      tags: projectTags,
    }))
  }

  return (
    <Autocomplete
      className="tag-input"
      multiple
      onChange={handleTagsChange}
      value={project.tags.map((tag) => tag.tagName)}
      options={allowedTags.map((tag) => tag.tagName)}
      renderInput={(params) => <TextField {...params} variant="standard" label="Add Tags" />}
    />
  )
}
export default AddTags
