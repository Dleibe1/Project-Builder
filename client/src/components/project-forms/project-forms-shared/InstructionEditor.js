import React, { useEffect, useRef } from "react"
import { useDropzone } from "react-dropzone"
import MarkdownService from "../../../services/MarkdownService.js"
import uploadImageFile from "../../../api/uploadImageFile.js"
import BundledEditor from "../../../services/TinyMCEBundler.js"

const InstructionEditor = ({ project, setProject, setEditingInstructions }) => {
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
    onDrop: async (acceptedFiles) => {
      try {
        const imageURL = await uploadImageFile(acceptedFiles)
        if (editorRef.current) {
          editorRef.current.insertContent(`<img src="${imageURL}" alt="uploaded" />`)
        }
      } catch (error) {
        console.error("Error in uploadImageFile() Fetch: ", error)
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

  // const handleEditorChange = (newValue, editor) => {
  //   const 
  //   setProject((prevState) => ({
  //     ...prevState,
  //     instructions,
  //   }))
  // }

  const allInstructions = project?.instructions.map((instruction, index) => {
    return `<h2>**Instruction**</h2> ${instruction.instructionHTML}`
  })

  return (
    <div className="tinymce-container">
      <div {...getRootProps()} style={{ display: "none" }}>
        <input {...getInputProps()} />
      </div>
      <BundledEditor
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          forced_root_block: 'div',
          toolbar_mode: "wrap",
          menubar: false,
          promotion: false,
          content_style: `
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
            "h2-button bold link add-image codesample-with-text italic emoticons charmap bullist removeformat  | download-as-markdown upload-markdown close-editor ",
          toolbar_sticky: true,
          setup: (editor) => {
            editor.on("PreInit", () => {
              editor.ui.registry.addButton("upload-markdown", {
                text: "Replace Contents With .md File",
                icon: "upload",
                tooltip: "The editor will render the contents of a markdown file",
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
            editor.ui.registry.addIcon(
              "heading-icon",
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 21" width="22" height="21" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.086 4.45c0-.478.387-.865.864-.865h3.458a.864.864 0 0 1 0 1.729h-.865v4.322h6.915V5.314h-.864a.864.864 0 0 1 0-1.729h3.457a.864.864 0 1 1 0 1.729h-.864v10.372h.864a.864.864 0 1 1 0 1.729h-3.457a.864.864 0 0 1 0-1.729h.864v-4.322H7.543v4.322h.865a.864.864 0 0 1 0 1.729H4.95a.864.864 0 0 1 0-1.729h.865V5.314H4.95a.864.864 0 0 1-.864-.865Z" fill="currentColor"></path></svg>',
            )
            editor.ui.registry.addButton("download-as-markdown", {
              text: "Download as Markdown",
              icon: "save",
              tooltip: "Download contents in markdown format",
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
                setEditingInstructions(false)
              },
            })
            editor.ui.registry.addButton("codesample-with-text", {
              icon: "code-sample",
              tooltip: "Insert Code Sample",
              onAction: function () {
                editor.execCommand("codesample")
              },
            })
            editor.ui.registry.addButton("h2-button", {
              icon: "heading-icon",
              tooltip: "Add heading",
              onAction: function () {
                editor.execCommand("FormatBlock", false, "h2")
              },
            })
            editor.ui.registry.addMenuItem("add-image-item", {
              text: "Add Image",
              icon: "image",
              onAction: () => {
                handleAddImage()
              },
            }),
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
        value={allInstructions.join("")}
        onEditorChange={(newValue, editor) => handleEditorChange(newValue, editor)}
      />
    </div>
  )
}

export default InstructionEditor
