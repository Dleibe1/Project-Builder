import React, { useState } from "react"
import { Editor } from "@tinymce/tinymce-react"

const TinyMCE = ({ project, setProject, index }) => {
  const handleEditorChange = (value) => {
    const instructions = [...project.instructions]
    instructions[index].instructionText = value
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
        apiKey="u5yk5um3x19v3fpfdrr4x22dad2uxqsp3hn1olscskjmo84y"
        init={{
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
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | codesample link image table | addcomment showcomments | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",

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
          images_upload_handler: handleImageUpload,
        }}
        value={project?.instructions[index].instructionText}
        onEditorChange={(newValue, editor) => handleEditorChange(newValue)}
      />
    </div>
  )
}

export default TinyMCE
