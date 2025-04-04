import TurnDownService from "turndown"
import showdown from "showdown"

class MarkdownService {
  static convertMarkdownToHTML = (markdownContent) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(markdownContent)
  }

  static convertHTMLToMarkdown = (HTMLContent) => {
    const turnDownService = new TurnDownService()
    return turnDownService.turndown(HTMLContent)
  }

  static downloadHtmlAsMarkdown = (htmlContent) => {
    const turnDownService = new TurnDownService()
    const markdownContent = turnDownService.turndown(htmlContent)
    const blob = new Blob([markdownContent], { type: "text/markdown;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "instructions.md"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  static getMarkdownFileContent = async () => {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input")
      input.type = "file"
      input.accept = ".md,.markdown"
      input.style.display = "none"
      input.onchange = (event) => {
        const file = event.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            resolve(e.target.result)
          }
          reader.onerror = (err) => reject(err)
          reader.readAsText(file)
        } else {
          reject(new Error("No file selected"))
        }
      }
      document.body.appendChild(input)
      input.click()
      document.body.removeChild(input)
    })
  }
}

export default MarkdownService
