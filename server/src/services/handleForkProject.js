import { Project, Part, Instruction } from "../models/index.js"

const handleForkProject = async (originalProjectId, userId, forkData) => {
  const originalProject = await Project.query().findById(originalProjectId)
  if (!originalProject) {
    throw new Error("Original project not found")
  }

  const forkedProject = await Project.query().insert({
    userId: parseInt(userId),
    githubFileURL: forkData.githubFileURL?.trim(),
    thumbnailImage: forkData.thumbnailImage,
    title: forkData.title,
    appsAndPlatforms: forkData.appsAndPlatforms,
    tags: forkData.tags,
    description: forkData.description,
    documentation: forkData.documentation,
    code: forkData.code,
    parentProjectId: originalProjectId,
  })
  const parts = forkData.parts
  const instructions = forkData.instructions
  const forkedProjectId = parseInt(forkedProject.id)

  await Promise.all(
    parts.map((part) => {
      return Part.query().insert({ projectId: forkedProjectId, partName: part.partName })
    })
  )

  for (const instruction of instructions) {
    await Instruction.query().insert({
      projectId: forkedProjectId,
      instructionText: instruction.instructionText,
      imageURL: instruction.imageURL,
    })
  }
}

export default handleForkProject
