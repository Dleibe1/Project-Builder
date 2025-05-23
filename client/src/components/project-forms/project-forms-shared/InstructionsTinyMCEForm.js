import React, { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import MarkdownService from "../../../services/MarkdownService.js"
import uploadImageFile from "../../../api/uploadImageFile.js"
import BundledEditor from "../../../services/TinyMCEBundler.js"

const InstructionsTinyMCEForm = ({ project, setProject, setEditingInstructions }) => {
  const [isNewProject, setIsNewProject] = useState(project?.instructions.length === 0)
  const editorRef = useRef(null)
  const dropzoneOpenRef = useRef(null)

  useEffect(() => {
    document.body.classList.remove("grey-background")
    const appBar = document.querySelector("#app-bar")
    appBar.style.display = "none"
    return () => {
      appBar.style.display = "flex"
      document.body.classList.add("grey-background")
    }
  }, [])

  const { getInputProps, getRootProps, open } = useDropzone({
    onDrop: (acceptedFiles) => {
      uploadImageFile(acceptedFiles)
        .then((imageURL) => {
          if (editorRef.current) {
            editorRef.current.insertContent(`<img src="${imageURL}" alt="uploaded" />`)
          }
        })
        .catch((error) => {
          console.error("Error Uploading Image: ", error)
        })
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

  const handleCloseEditor = (editorContent) => {
    // Root block is a <p> tag if it's a new project.
    // When persisted, we always want the root block to be a div.
    // For existing seeded projects, the root block is already a div.
    if (project?.instructions.length) {
      if (isNewProject) {
        setProject((prevState) => ({
          ...prevState,
          instructions: `<div>${editorContent}</div>`,
        }))
      } else {
        setProject((prevState)=> ({
          ...prevState,
          instructions: editorContent
        }))
      }
    }
    setEditingInstructions(false)
  }

  const handleEditorChange = (newValue, editor) => {
    setProject((prevState) => ({
      ...prevState,
      instructions: newValue,
    }))
  }

  return (
    <div data-cy="tinymce-container" className="tinymce-container">
      <div {...getRootProps()} style={{ display: "none" }}>
        <input {...getInputProps()} />
      </div>
      <BundledEditor
        onInit={(evt, editor) => {
          editorRef.current = editor
        }}
        init={{
          //Check to see whether this is a new project.  If so, set the root block to "p"
          forced_root_block: project?.instructions.length === 0 ? "p" : "div",
          toolbar_mode: "wrap",
          menubar: false,
          promotion: false,
          content_style: `
            div {font-size: 1.3rem; color: #374146; line-height: 130%; }
            img { max-width: 50%; height: auto; padding-top: 40px; padding-bottom: 40px; }
            h2 { font-weight: 700; font-size: 30px; color: #374146; } 
            p {font-size: 1.3rem; color: #374146; line-height: 130%;}`,
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
            "h2-button bold link add-image italic emoticons charmap bullist removeformat codesample-with-text undo redo | download-as-markdown upload-markdown close-editor ",
          toolbar_sticky: true,
          setup: (editor) => {
            editor.ui.registry.addIcon(
              "heading-icon",
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 21" width="22" height="21" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.086 4.45c0-.478.387-.865.864-.865h3.458a.864.864 0 0 1 0 1.729h-.865v4.322h6.915V5.314h-.864a.864.864 0 0 1 0-1.729h3.457a.864.864 0 1 1 0 1.729h-.864v10.372h.864a.864.864 0 1 1 0 1.729h-3.457a.864.864 0 0 1 0-1.729h.864v-4.322H7.543v4.322h.865a.864.864 0 0 1 0 1.729H4.95a.864.864 0 0 1 0-1.729h.865V5.314H4.95a.864.864 0 0 1-.864-.865Z" fill="currentColor"></path></svg>',
            )
            editor.ui.registry.addButton("upload-markdown", {
              text: "Replace Contents With .md File",
              icon: "upload",
              tooltip: "The editor will render the contents of a markdown file",
              onAction: async () => {
                try {
                  const markdownContent = await MarkdownService.getMarkdownFileContent()
                  const html = MarkdownService.convertMarkdownToHTML(markdownContent)
                  editor.undoManager.transact(() => {
                    editor.setContent(html)
                  })
                } catch (error) {
                  console.error("Markdown upload failed:", error)
                }
              },
            })
            editor.ui.registry.addButton("download-as-markdown", {
              text: "Download as Markdown",
              icon: "save",
              tooltip: "Download editor contents in markdown format",
              onAction: () => {
                MarkdownService.downloadHtmlAsMarkdown(editor.getContent())
              },
            })
            editor.ui.registry.addButton("add-image", {
              icon: "image",
              tooltip: "Upload an Image",
              onAction: () => {
                handleAddImage()
              },
            })
            editor.ui.registry.addButton("close-editor", {
              text: "Close Editor",
              icon: "close",
              tooltip: "Close and return to project form",
              onAction: () => {
                handleCloseEditor(editor.getContent())
              },
            })
            editor.ui.registry.addButton("codesample-with-text", {
              icon: "code-sample",
              text: "Code Sample",
              onAction: () => {
                editor.execCommand("codesample")
              },
            })
            editor.ui.registry.addButton("h2-button", {
              icon: "heading-icon",
              tooltip: "Add heading",
              onAction: () => {
                editor.execCommand("FormatBlock", false, "h2")
              },
            })
            editor.ui.registry.addMenuItem("add-image-item", {
              text: "Add Image",
              icon: "image",
              onAction: () => {
                handleAddImage()
              },
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
