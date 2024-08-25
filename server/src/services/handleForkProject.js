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
  await Promise.all(
    parts.map((part) => {
      return Part.query().insert({ projectId: forkedProjectId, partName: part.partName })
    }),
  )
  await Promise.all(
    instructions.map((instruction) => {
      if (instruction.imageURL) {
        return Instruction.query().insert({
          projectId: forkedProjectId,
          imageURL: instruction.imageURL,
        })
      } else if (instruction.instructionText) {
        return Instruction.query().insert({
          projectId: forkedProjectId,
          instructionText: instruction.instructionText,
        })
      }
    }),
  )
}

export default handleForkProject
