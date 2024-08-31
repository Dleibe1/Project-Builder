import React from "react"
import { useLocation } from "react-router-dom"
import { TextField, Stack } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import tags from "../../../../shared/tags.js"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const Tags = ({ setSelectedTags }) => {
  const location = useLocation()
  const handleTagsChange = (event, value) => {
    setSelectedTags(value)
  }

  if (!location.pathname.includes("/project-list")) {
    return null
  }
  return (
    <Stack
      spacing={3}
      sx={{
        width: 250,
        minWidth: "max-content",
        position: "absolute",
        top: "60px",
        marginLeft: "20px",
      }}
    >
      <Autocomplete
        onChange={handleTagsChange}
        className="tag-input"
        multiple
        id="tags-standard"
        options={tags.map((tag) => {
          return tag.tagName
        })}
        renderInput={(params) => <TextField {...params} variant="standard" label="Tags" />}
      />
    </Stack>
  )
}
export default Tags
