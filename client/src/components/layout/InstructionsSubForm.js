import { Editor } from "@tinymce/tinymce-react"
import React, { useEffect } from "react"

const InstructionsSubForm = ({ project, setProject, setEditingInstructions }) => {
  useEffect(() => {
    const appBar = document.getElementById("app-bar")
    appBar.style.display = "none"
    return () => {
      appBar.style.display = "flex"
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
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        init={{
          content_style: `
            img { max-width:50%; height: auto; } `,
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
            "save undo redo | blocks | bold italic underline strikethrough | codesample link image table | addcomment showcomments | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
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
          },
          images_upload_handler: handleImageUpload,
          selector: "textarea",
          min_height: 900,
        }}
        value={project?.instructions}
        onEditorChange={(newValue, editor) => handleEditorChange(newValue, editor)}
      />
    </div>
  )
}

export default InstructionsSubForm
