import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';


const ForkProjectButton = ({ id }) => {
  return (
    <Link to={`/fork-projects/${id}`}>
      <Button variant="contained">Hello world</Button>;
      {/* <button id="edit-build-button">Fork Project</button> */}
    </Link>
  )
}

export default ForkProjectButton
