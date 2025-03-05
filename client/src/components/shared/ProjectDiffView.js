import React from "react"
import ReactDiffViewer from "react-diff-viewer-continued"

const ProjectDiffView = ({originalProject, forkedProject}) => {
  return (
    <ReactDiffViewer
      oldValue={oldCode}
      newValue={newCode}
      splitView={true}
      compareMethod={DiffMethod.CSS}
      hideLineNumbers={false}
      renderContent={highlightSyntax}
    />
  )
}

export default ProjectDiffView
