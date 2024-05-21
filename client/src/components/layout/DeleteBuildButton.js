
import React, { useState } from "react"
import { Redirect } from "react-router-dom"

const DeleteBuildButton = ({ id }) => {
 const [shouldRedirect, setShouldRedirect] = useState(false)
 const deleteBuild = async (event) => {
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
   return <Redirect push to={"/my-builds"} />
 }

 return (
   <button id="delete-build-button" onClick={deleteBuild}>
     Delete Build
   </button>
 )
}

export default DeleteBuildButton



