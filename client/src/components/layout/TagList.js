import React, { useState } from "react"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"

const TagList = ({ tags }) => {
  const handleClick = () => {

  }

  const tagChips = tags.map((tag) => {
    return <Chip className="tag-chip" size="large" label={tag.tagName} onClick={handleClick} />
  })

  return (
    <Stack className="tag-stack" direction="row" spacing={1}>
      {tagChips}
    </Stack>
  )
}

export default TagList
