import React, { useEffect, useMemo } from "react"
import { Button } from "@mui/material"
import DOMPurify from "dompurify"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"

const Instructions = ({ project, setEditingInstructions }) => {
  useEffect(() => {
    //Apply highlighting after default css has been applied
    const codeTags = document.querySelectorAll("code")
    codeTags.forEach((tag) => {
      delete tag.dataset.highlighted
    })
    hljs.highlightAll()
  }, [project])

  const wrapImagesAndNonImages = (htmlString) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, "text/html")
    const body = doc.body
    const fragment = doc.createDocumentFragment()
    let nonImageGroup = [] // To temporarily store nodes that are not images

    // Convert the live NodeList into an array for safe iteration
    const children = Array.from(body.childNodes)
    children.forEach((child) => {
      // Check if this is an element node and specifically an <img>
      if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() === "img") {
        // If there's any collected non-image content, wrap it first
        if (nonImageGroup.length > 0) {
          const wrapper = doc.createElement("div")
          wrapper.className = "preserve-white-space instruction-text showpage-items-container"
          nonImageGroup.forEach((node) => wrapper.appendChild(node))
          fragment.appendChild(wrapper)
          nonImageGroup = [] // Reset the group
        }
        // Wrap the image itself in a div
        const imageWrapper = doc.createElement("div")
        imageWrapper.className = "preserve-white-space instruction-text showpage-items-container"
        imageWrapper.appendChild(child)
        fragment.appendChild(imageWrapper)
      } else {
        // For any non-image node, add it to the current group
        nonImageGroup.push(child)
      }
    })

    // If any non-image nodes remain after the loop, wrap them too
    if (nonImageGroup.length > 0) {
      const wrapper = doc.createElement("div")
      wrapper.className = "preserve-white-space instruction-text showpage-items-container"
      nonImageGroup.forEach((node) => wrapper.appendChild(node))
      fragment.appendChild(wrapper)
    }

    // Create a temporary container to get the HTML string from the fragment
    const tempDiv = doc.createElement("div")
    tempDiv.appendChild(fragment)
    return tempDiv.innerHTML
  }

  const processedInstructions = useMemo(() => {
    if (project.instructions && project.instructions[0]) {
      // First, sanitize the HTML string
      const sanitizedHTML = DOMPurify.sanitize(project.instructions[0].instructionText)
      // Then, wrap all image tags in the desired container
      return wrapImagesAndNonImages(sanitizedHTML)
    }
    return ""
  }, [project.instructions])

  return (
    <>
      <div className="instruction-list-buttons-container edit-instructions-button-container">
        <Button
          className="large-button instruction-list-button edit-instructions-button"
          variant="contained"
          onClick={() => setEditingInstructions(true)}
        >
          Edit Instructions
        </Button>
      </div>
      <div className="form-items-container top-sectinon">
        <h2 id="form-instructions-heading">Instructions:</h2>
      </div>

      <div dangerouslySetInnerHTML={{ __html: processedInstructions }}></div>
    </>
  )
}

export default Instructions
