import React, { useEffect } from "react"
import { Editor } from "@tinymce/tinymce-react"

const TinyMCE = ({ project, setProject, setEditingInstructions }) => {
  useEffect(() => {
    const appBar = document.getElementById("app-bar")
    appBar.style.display = "none"
    return () => {
      appBar.style.display = "flex"
    }
  }, [])

  const handleEditorChange = (newValue, editor) => {
    const instructions = [...project.instructions]
    instructions[0].instructionText = newValue
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
      {/* <div className="save-instructions-button-container">
        <Button
          className="large-button instruction-list-button save-instructions-button"
          variant="contained"
        >
          Save instructions
        </Button>
      </div> */}
      <Editor
        apiKey="u5yk5um3x19v3fpfdrr4x22dad2uxqsp3hn1olscskjmo84y"
        init={{
          content_style: "img { width: 50%; } ",
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
          selector: "textarea",
          setup: (editor) => {
            editor.on('PreInit', () => {
              editor.ui.registry.addButton('save', {
                text: 'SAVE INSTRUCTIONS',
                onAction: () => {
                  setEditingInstructions(false);
                }
              });
            });
          },
          images_upload_handler: handleImageUpload,
          promotion: false,
        }}
        value={project?.instructions[0].instructionText}
        onEditorChange={(newValue, editor) => handleEditorChange(newValue, editor)}
      />
    </div>
  )
}

export default TinyMCE
