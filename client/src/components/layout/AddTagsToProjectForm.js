import React from "react"
import { TextField, Stack } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const AddTagsToProjectForm = ({ project, setProject }) => {
  const handleTagsChange = (event, value) => {
    setProject((prevState) => ({
      ...prevState,
      tags: value,
    }))
  }

  return (
    <Stack
      spacing={3}
      className="tag-input"
      sx={{
        minWidth: "250px",
        maxWidth: "fit-content",
      }}
    >
      <Autocomplete
        multiple
        onChange={handleTagsChange}
        value={project.tags}
        options={tags.map((tag) => {
          return tag.tagName
        })}
        renderInput={(params) => <TextField {...params} variant="standard" label="Add Tags" />}
      />
    </Stack>
  )
}
export default AddTagsToProjectForm
