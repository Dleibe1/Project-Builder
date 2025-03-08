import React from "react"
import { TextField, Stack } from "@mui/material"
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
    <Stack spacing={3} className="tag-input">
      <Autocomplete
        multiple
        onChange={handleTagsChange}
        value={project.tags.map((tag) => tag.tagName)}
        options={allowedTags.map((tag) => tag.tagName)}
        renderInput={(params) => <TextField {...params} variant="standard" label="Add Tags" />}
      />
    </Stack>
  )
}
export default AddTags
