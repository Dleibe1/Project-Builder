import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { TextField, Stack } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const Tags = ({setSelectedTags}) => {
  const location = useLocation()
  const handleTagsChange = (event, value) => {
    setSelectedTags(value)
  }
  
  if (!location.pathname.includes("/project-list")){
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
        options={tags}
        renderInput={(params) => <TextField {...params} variant="standard" label="Tags" />}
      />
    </Stack>
  )
}

const tags = [
  "Animals",
  "Arduino User Group",
  "Audio",
  "Cars",
  "Clocks",
  "Communication",
  "Data Collection",
  "Debugging Tools",
  "Disability Reduction",
  "Drones",
  "Embedded",
  "Energy Efficiency",
  "Entertainment System",
  "Environmental Sensing",
  "Food And Drinks",
  "Games",
  "Garden",
  "Greener Planet",
  "Health",
  "Helicopters",
  "Home Automation",
  "Human Welfare",
  "Internet Of Things",
  "Kids",
  "Lights",
  "Monitoring",
  "Music",
  "Passenger Vehicles",
  "Pets",
  "Planes",
  "Remote Control",
  "Security",
  "Smart appliances",
  "Smartwatches",
  "Tools",
  "Toys",
  "Tracking",
  "Transportation",
  "Wardriving",
  "Wearables",
  "Weather",
]

export default Tags
