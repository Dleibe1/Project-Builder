import TurnDownService from "turndown"

 const downloadHtmlAsMarkdown = (htmlContent) => {
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

  export { downloadHtmlAsMarkdown }
