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
  const partInsertions = parts.map(async (part) => {
    return await Part.query().insert({ projectId: forkedProjectId, partName: part.partName })
  })

  const instructionInsertions = instructions.map(async (instruction) => {
    if (instruction.imageURL) {
      return await Instruction.query().insert({
        projectId: forkedProjectId,
        imageURL: instruction.imageURL,
      })
    } else if (instruction.instructionText) {
      return await Instruction.query().insert({
        projectId: forkedProjectId,
        instructionText: instruction.instructionText,
      })
    }
  })
  await Promise.all([...partInsertions, ...instructionInsertions])
}

export default handleForkProject
