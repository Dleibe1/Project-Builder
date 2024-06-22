import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';

const EditBuildButton = ({ id }) => {
  return (
    <Link to={`/edit-my-build/${id}`}>
       <Button id="edit-build-button" variant="contained" >Edit Build</Button>
    </Link>
  )
}

export default EditBuildButton
