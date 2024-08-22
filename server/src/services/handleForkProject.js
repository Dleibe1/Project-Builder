import { Project, Part, Instruction } from "../models/index.js"

const handleForkProject = async (originalProjectId, userId, forkData) => {
  const originalProject = await Project.query().findById(originalProjectId)
  if (!originalProject) {
    throw new Error("Original project not found")
  }

  const forkedProject = await Project.query().insert({
    userId: parseInt(userId),
    githubFileURL: forkData.githubFileURL,
    thumbnailImage: forkData.thumbnailImage || originalProject.thumbnailImage,
    title: forkData.title,
    appsAndPlatforms: forkData.appsAndPlatforms || originalProject.appsAndPlatforms,
    tags: forkData.tags || originalProject.tags,
    description: forkData.description,
    documentation: forkData.documentation || originalProject.documentation,
    code: forkData.code || originalProject.code,
    parentProjectId: originalProjectId,
  })

  const parts = forkData.parts
  const instructions = forkData.instructions
  const forkedProjectId = parseInt(forkedProject.id)
  for (const part of parts) {
    await Part.query().insert({ projectId: forkedProjectId, partName: part.partName })
  }
  for (const instruction of instructions) {
    if (instruction.imageURL) {
      await Instruction.query().insert({
        projectId: forkedProjectId,
        imageURL: instruction.imageURL,
      })
    } else if (instruction.instructionText) {
      await Instruction.query().insert({
        projectId: forkedProjectId,
        instructionText: instruction.instructionText,
      })
    }
  }
}

export default handleForkProject
