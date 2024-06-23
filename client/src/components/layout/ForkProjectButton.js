import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';


const ForkProjectButton = ({ id }) => {
  return (
    <Link to={`/fork-project/${id}`}>
      <Button className="large-button" id="fork-project" variant="contained">Fork Project</Button>
    </Link>
  )
}

export default ForkProjectButton
