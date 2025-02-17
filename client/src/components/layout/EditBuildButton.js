import React, { useContext } from "react"
import { EditingInstructionsContext } from "../../contexts/EditingInstructionsContext"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

const EditBuildButton = ({ id }) => {
  const { editing, setEditing } = useContext(EditingInstructionsContext)
  return (
    <Button
      component={Link}
      onClick={setEditing(true)}
      to={`/edit-my-build/${id}`}
      className="large-button"
      id="edit-project"
      variant="contained"
      sx={{
        "&:hover": {
          textDecoration: "none",
          color: "white",
        },
      }}
    >
      Edit Build
    </Button>
  )
}

export default EditBuildButton
