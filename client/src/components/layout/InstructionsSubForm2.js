import React, { useState, useEffect } from "react"
import { Button } from "@mui/material"
import CloudUpload from "@mui/icons-material/CloudUpload"
import Dropzone from "react-dropzone"
import DeleteIcon from "@mui/icons-material/Delete"
import TinyMCE from "./TinyMCE"
import DOMPurify from "dompurify"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"

const InstructionsSubForm2 = ({ project, setProject }) => {
  const [imageFile, setImageFile] = useState({
    image: {},
  })

  const handleImageUpload = async () => {
    const newImageFileData = new FormData()
    newImageFileData.append("image", imageFile.image)
    try {
      const response = await fetch("/api/v1/image-upload", {
        method: "POST",
        headers: {
          Accept: "image/jpeg",
        },
        body: newImageFileData,
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
	  return body.imageURL
    } catch (error) {
      console.error(`Error in uploadProjectImage Fetch: ${error.message}`)
    }
  }
  return (
	<TinyMCE project={project} setProject={setProject} />
  )
}

export default InstructionsSubForm2