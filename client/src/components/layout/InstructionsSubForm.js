import { Editor } from "@tinymce/tinymce-react"
import React, { useEffect, useRef } from "react"
import { downloadHtmlAsMarkdown } from "../../services/markdownService"

const InstructionsSubForm = ({ project, setProject, setEditingInstructions }) => {
  const editorRef = useRef(null)
  useEffect(() => {
    const appBar = document.getElementById("app-bar")
    appBar.style.display = "none"
    document.body.classList.remove("grey-background")
    return () => {
      appBar.style.display = "flex"
      document.body.classList.add("grey-background")
    }
  }, [])

  const handleEditorChange = (newValue, editor) => {
    let instructions = project.instructions
    instructions = newValue
    setProject((prevState) => ({
      ...prevState,
      instructions: instructions,
    }))
  }

  const handleImageUpload = async (blobInfo, success, failure, progress) => {
    const imageFileData = new FormData()
    imageFileData.append("image", blobInfo.blob(), blobInfo.filename())
    try {
      const response = await fetch("/api/v1/image-upload", {
        method: "POST",
        body: imageFileData,
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      return body.imageURL
    } catch (error) {
      failure(`Image upload failed: ${error.message}`)
    }
  }

  return (
    <div className="tinymce-container">
      <Editor
        ref={editorRef}
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        init={{
          content_style: `
            img { max-width: 50%; height: auto; padding-top: 40px; padding-bottom: 40px; } 
            p {font-size: 1.5rem;}`,
          plugins: [
            "autoresize",
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "save",
            "emoticons",
            "image",
            "link",
            "lists",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
          ],
          toolbar:
            "save download-as-markdown undo redo | blocks codesample link image | bold italic underline strikethrough | table | addcomment showcomments | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          toolbar_sticky: true,
          setup: (editor) => {
            editor.on("PreInit", () => {
              editor.ui.registry.addButton("save", {
                text: "SAVE INSTRUCTIONS",
                onAction: () => {
                  setEditingInstructions(false)
                },
              })
            })
            editor.ui.registry.addButton("download-as-markdown", {
              text: "Download Markdown",
              onAction: () => {
                downloadHtmlAsMarkdown(project.instructions)
              },
            })
            editor.on("keydown", (event) => {
              if (event.key === "Tab") {
                event.preventDefault()
                editor.execCommand("mceInsertContent", false, "&emsp;")
              }
            })
          },
          images_upload_handler: handleImageUpload,
          selector: "textarea",
          min_height: 900,
          width: "90vw",
        }}
        value={project?.instructions}
        onEditorChange={(newValue, editor) => handleEditorChange(newValue, editor)}
      />
    </div>
  )
}

export default InstructionsSubForm
