import React, { useContext} from "react"
import { useLocation } from "react-router-dom"
import { TextField, Stack } from "@mui/material"
import { TagContext } from "../../contexts/TagContext"
import Autocomplete from "@mui/material/Autocomplete"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import tags from "../../../../shared/tags.js"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const Tags = () => {
  const location = useLocation()
  const { selectedTag, setSelectedTag } = useContext(TagContext)

  const handleTagsChange = (event, value) => {
    setSelectedTag(value)
  }

  if (location.pathname !== "/") {
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
        right: "20px",
        marginLeft: "20px",
      }}
    >
      <Autocomplete
        onChange={handleTagsChange}
        className="tag-input"
        value={selectedTag}
        id="tags-standard"
        options={tags.map((tag) => {
          return tag.tagName
        })}
        renderInput={(params) => <TextField {...params} variant="standard" label="Filter By Tag" />}
      />
    </Stack>
  )
}
export default Tags
