import React, { useContext } from "react"
import { EditingInstructionsContext } from "../../contexts/EditingInstructionsContext"
import { Editor } from "@tinymce/tinymce-react"
import { Button } from "@mui/material"

const TinyMCE = ({ project, setProject }) => {

  const { editing, setEditing } = useContext(EditingInstructionsContext)

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
      <div className="save-instructions-button-container">
        <Button
          onClick={()=> setEditing(false)}
          className="large-button instruction-list-button"
          variant="contained"
        >
          Save instructions
        </Button>
      </div>
      <Editor
        apiKey="u5yk5um3x19v3fpfdrr4x22dad2uxqsp3hn1olscskjmo84y"
        init={{
          content_style: "img { width: 50%; }",
          plugins: [
            // Core editing features
            "autoresize",
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
            // Your account includes a free trial of TinyMCE premium features
            // Try the most popular premium features until Nov 15, 2024:
            // "checklist",
            // "casechange",
            // "export",
            // "formatpainter",
            // "a11ychecker",
            // "tinymcespellchecker",
            // "permanentpen",
            // "powerpaste",
            // "advtable",
            // "advcode",
            // "editimage",
            // "mentions",
            // "tableofcontents",
            // "footnotes",
            // "mergetags",
            // "autocorrect",
            // "typography",
            // "inlinecss",
            // "markdown",
            // Early access to document converters
            // "importword",
            // "exportword",
            // "exportpdf",
          ],
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough | codesample link image table | addcomment showcomments | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          toolbar_sticky: true,
          toolbar_sticky_offset: 50,
          // ai_request: (request, respondWith) =>
          //   respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          // exportpdf_converter_options: {
          //   format: "Letter",
          //   margin_top: "1in",
          //   margin_right: "1in",
          //   margin_bottom: "1in",
          //   margin_left: "1in",
          // },
          // exportword_converter_options: { document: { size: "Letter" } },
          // importword_converter_options: {
          //   formatting: { styles: "inline", resets: "inline", defaults: "inline" },
          // },
          selector: "textarea",
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
