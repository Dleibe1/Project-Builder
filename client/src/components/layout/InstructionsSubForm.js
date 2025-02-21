import { Editor } from "@tinymce/tinymce-react"
import React from "react"
import {
  downloadHtmlAsMarkdown,
  convertMarkdownToHTML,
  getMarkdownFileContent,
} from "../../services/markdownService"

const InstructionsSubForm = ({ project, setProject }) => {

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
  console.log(project)
  const handleEditorChange = (newValue, editor) => {
    setProject((prevState) => ({
      ...prevState,
      instructions: newValue,
    }))
  }

  return (
    <div className="tinymce-container">
      <Editor
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
            "download-as-markdown upload-markdown undo redo | blocks codesample link image | bold italic underline strikethrough | table | addcomment showcomments | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          toolbar_sticky: true,
          toolbar_sticky_offset: 52,
          setup: (editor) => {
            editor.on("PreInit", () => {
              editor.ui.registry.addButton("upload-markdown", {
                text: "UPLOAD MARKDOWN",
                onAction: async () => {
                  try {
                    const markdownContent = await getMarkdownFileContent()
                    const html = convertMarkdownToHTML(markdownContent)
                    editor.setContent(html)
                  } catch (error) {
                    console.error("Markdown upload failed:", error)
                  }
                },
              })
            })
            editor.ui.registry.addButton("download-as-markdown", {
              text: "DOWNLOAD INSTRUCTIONS AS MARKDOWN",
              onAction: () => {
                downloadHtmlAsMarkdown(editor.getContent())
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
