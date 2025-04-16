import React from "react"
import { Backdrop, CircularProgress } from "@mui/material"

const Loading = (props) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress size={80} color="inherit" />
    </Backdrop>
  )
}

export default Loading