import React, { createContext, useState } from "react"

const EditingInstructionsContext = createContext()

const EditingInstructionsProvider = ({ children }) => {
  const [editing, setEditing] = useState(true)
  return (
    <EditingInstructionsContext.Provider value={{ editing, setEditing }}>
      {children}
    </EditingInstructionsContext.Provider>
  )
}

export {EditingInstructionsContext, EditingInstructionsProvider}