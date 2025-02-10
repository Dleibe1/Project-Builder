import React from "react"
import { TextField, Stack } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import tags from "../../../../shared/tags"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const AddTags = ({ project, setProject }) => {
  const handleTagsChange = (event, value) => {
    const chosenTagNames = value
    const tags = chosenTagNames.map((tagName) => {
      return { tagName }
    })
    setProject((prevState) => ({
      ...prevState,
      tags: tags,
    }))
  }

  return (
    <Stack spacing={3} className="tag-input">
      <Autocomplete
        multiple
        onChange={handleTagsChange}
        value={project.tags.map((tag) => tag.tagName)}
        options={tags.map((tag) => tag.tagName)}
        renderInput={(params) => <TextField {...params} variant="standard" label="Add Tags" />}
      />
    </Stack>
  )
}
export default AddTags
