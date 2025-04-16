import React from "react"
import { Backdrop, CircularProgress, collapseClasses } from "@mui/material"

const Loading = (props) => {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <h1 style={{ color: "#374146", paddingRight: "40px" }}>Loading...</h1>
      <CircularProgress size={80} style={{ color: "#374146" }} />
    </div>
  )
}

export default Loading
