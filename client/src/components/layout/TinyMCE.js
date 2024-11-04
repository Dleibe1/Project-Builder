import React, { useState } from "react"
import { Editor } from "@tinymce/tinymce-react"

const TinyMCE = (props) => {
  const [value, setValue] = useState("")
  console.log(value)
  return (
    <Editor
      apiKey="u5yk5um3x19v3fpfdrr4x22dad2uxqsp3hn1olscskjmo84y"
      init={{
        plugins: [
          // Core editing features
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
      }}
      value={value}
      onEditorChange={(newValue, editor) => setValue(newValue)}
    />
  )
}

export default TinyMCE
