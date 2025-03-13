import React, { useEffect, useRef } from "react"
import { useDropzone } from "react-dropzone"
import MarkdownService from "../../../services/MarkdownService.js"
import BundledEditor from "../../../services/TinyMCEBundler.js"

const InstructionsTinyMCEForm = ({ project, setProject, setEditingInstructions }) => {
  const editorRef = useRef(null)
  const dropzoneOpenRef = useRef(null)

  useEffect(()=> {
    const appBar = document.querySelector("#app-bar")
    appBar.style.display = "none"
    return () => {
      appBar.style.display= "flex"
    }
  },[])

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
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          forced_root_block: 'div',
          menu: {
            insert: {
              title: "Insert",
              items: "link add-image-item codesample table charmap emoticons hr anchor",
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
            "download-as-markdown upload-markdown close-editor add-image undo redo | blocks codesample link | bold italic underline strikethrough | table | addcomment showcomments | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          toolbar_sticky: true,
          setup: (editor) => {
            editor.on("PreInit", () => {
              editor.ui.registry.addButton("upload-markdown", {
                text: "REPLACE CONTENTS WITH .md FILE",
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
            editor.ui.registry.addButton("close-editor", {
              text: "CLOSE EDITOR",
              tooltip: "Close and return to project form",
              onAction: () => {
                setEditingInstructions(false)
              },
            })
            editor.ui.registry.addMenuItem("add-image-item", {
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
