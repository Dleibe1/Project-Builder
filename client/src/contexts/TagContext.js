import React, { createContext, useState } from "react"

const TagContext = createContext()

const TagProvider = ({ children }) => {
  const [selectedTag, setSelectedTag] = useState("")
  return (
    <TagContext.Provider value={{ selectedTag, setSelectedTag }}>{children}</TagContext.Provider>
  )
}

export { TagContext, TagProvider }
