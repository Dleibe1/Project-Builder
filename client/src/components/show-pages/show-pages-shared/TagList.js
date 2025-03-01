import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { TagContext } from "../../../contexts/TagContext"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"

const TagList = ({ tags }) => {
  const history = useHistory()
  const { selectedTag, setSelectedTag } = useContext(TagContext)
  const tagSearch = (tagName) => {
    history.push(`/?tag=${tagName}`)
    setSelectedTag(tagName)
  }
  const tagChips = tags.map((tag) => {
    return (
      <Chip
        key={`${tag.tagName}${tag.id}`}
        className="tag-chip"
        size="large"
        label={tag.tagName}
        onClick={() => tagSearch(tag.tagName)}
      />
    )
  })

  return (
    <Stack className="tag-stack" direction="row" spacing={1}>
      {tagChips}
    </Stack>
  )
}

export default TagList
