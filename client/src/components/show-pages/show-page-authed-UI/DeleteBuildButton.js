import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import Button from "@mui/material/Button"
import deleteProject from "../../../api/deleteProject"

const DeleteBuildButton = ({ id }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const deleteBuild = () => {
   deleteProject(id).then(() => {
   setShouldRedirect(true)
   })
  }

  if (shouldRedirect) {
    return <Redirect push to={"/my-builds-list?page=1"} />
  }

  return (
    <Button className="delete-build-button large-button" variant="contained" onClick={deleteBuild}>
      Delete Build
    </Button>
  )
}

export default DeleteBuildButton
