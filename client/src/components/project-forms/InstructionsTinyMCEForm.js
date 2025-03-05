import React, { useRef } from "react"
import { useDropzone } from "react-dropzone"
import MarkdownService from "../../services/MarkdownService.js"
import BundledEditor from "../../services/TinyMCEBundler.js"

const InstructionsTinyMCEForm = ({ project, setProject, setEditingInstructions }) => {
  const editorRef = useRef(null)
  const dropzoneOpenRef = useRef(null)

  const { getInputProps, getRootProps, open } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0]
      const formData = new FormData()
      formData.append("image", file)
      try {
        const response = await fetch("/api/v1/image-upload", {
          method: "POST",
          body: formData,
        })
        if (!response.ok) {
          throw new Error("Image upload failed")
        }
        const body = await response.json()
        const imageUrl = body.imageURL
        console.log(imageUrl)
        if (editorRef.current) {
          editorRef.current.insertContent(`<img src="${imageUrl}" alt="uploaded" />`)
        }
      } catch (error) {
        console.error(error)
      }
    },
    noClick: true,
    noKeyboard: true,
  })
console.log(project)
  dropzoneOpenRef.current = open

  const handleAddImage = () => {
    if (dropzoneOpenRef.current) {
      dropzoneOpenRef.current()
    }
  }

  const handleEditorChange = (newValue, editor) => {
    setProject((prevState) => ({
      ...prevState,
      instructions: newValue,
    }))
  }

  return (
    <div className="tinymce-container">
      <div {...getRootProps()} style={{ display: "none" }}>
        <input {...getInputProps()} />
      </div>
      <BundledEditor
        // apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          menu: {
            insert: {
              title: "Insert",
              items: "link addImageItem codesample table charmap emoticons hr anchor",
            }
          },
          promotion: false,
          content_style: `
            img { max-width: 50%; height: auto; padding-top: 40px; padding-bottom: 40px; } 
            p {font-size: 1.5rem;}`,
          content_css: ["https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css"],
          plugins: [
            "autoresize",
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "save",
            "emoticons",
            "link",
            "lists",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
          ],
          toolbar:
            "download-as-markdown upload-markdown add-image save-and-return-to-project-form undo redo | blocks codesample link | bold italic underline strikethrough | table | addcomment showcomments | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          toolbar_sticky: true,
          toolbar_sticky_offset: 52,
          setup: (editor) => {
            editor.on("PreInit", () => {
              editor.ui.registry.addButton("upload-markdown", {
                text: "UPLOAD MARKDOWN FILE",
                tooltip: "Replace contents with a .md file",
                onAction: async () => {
                  try {
                    const markdownContent = await MarkdownService.getMarkdownFileContent()
                    const html = MarkdownService.convertMarkdownToHTML(markdownContent)
                    editor.setContent(html)
                  } catch (error) {
                    console.error("Markdown upload failed:", error)
                  }
                },
              })
            })
            editor.ui.registry.addButton("download-as-markdown", {
              text: "DOWNLOAD AS MARKDOWN",
              tooltip: "Download contents as a .md file",
              onAction: () => {
                MarkdownService.downloadHtmlAsMarkdown(editor.getContent())
              },
            })
            editor.ui.registry.addButton("add-image", {
              text: "Upload Image",
              icon: "image", 
              tooltip: "Upload Image",
              onAction: () => {
                handleAddImage()
              },
            })
            editor.ui.registry.addButton("save-and-return-to-project-form", {
              text: "Save Progress",
              icon: "save", 
              tooltip: "Save Progress",
              onAction: () => {
                setEditingInstructions(false)
              },
            })
            editor.ui.registry.addMenuItem("addImageItem", {
              text: "Add Image",
              icon: "image", 
              onAction: () => {
                handleAddImage()
              },
            })
            editor.on("keydown", (event) => {
              if (event.key === "Tab") {
                event.preventDefault()
                editor.execCommand("mceInsertContent", false)
              }
            })
          },
          selector: "textarea",
          min_height: 1000,
          width: "95vw",
        }}
        value={project?.instructions}
        onEditorChange={(newValue, editor) => handleEditorChange(newValue, editor)}
      />
    </div>
  )
}

export default InstructionsTinyMCEForm
