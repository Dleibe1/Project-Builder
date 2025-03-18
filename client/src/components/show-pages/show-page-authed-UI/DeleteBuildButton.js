import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import Button from "@mui/material/Button"

const DeleteBuildButton = ({ id }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const deleteBuild = async () => {
    try {
      const response = await fetch(`/api/v1/projects/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      setShouldRedirect(true)
    } catch (error) {
      console.log(error)
    }
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
