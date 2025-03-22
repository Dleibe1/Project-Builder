import { Project, Part, Tag, Instruction } from "../models/index.js"

const handleForkProject = async (parentProjectId, userId, forkData) => {
  const parentProject = await Project.query().findById(parentProjectId)
  if (!parentProject) {
    throw new Error("Parent project not found")
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
    parentProjectId,
  })
  const forkedProjectId = parseInt(forkedProject.id)
  const parts = forkData.parts

  for (const part of parts) {
    await Part.query().insert({
      projectId: forkedProjectId,
      partName: part.partName,
      partPurchaseURL: part.partPurchaseURL,
    })
  }

  const instructions = forkData.instructions
  for (const instruction of instructions) {
    await Instruction.query().insert({
      projectId: forkedProjectId,
      instructionHTML: instruction.instructionHTML,
    })
  }

  const tagsToRelate = await Tag.query()
    .select("id")
    .whereIn(
      "tagName",
      forkedProject.tags.map((tag) => tag.tagName),
    )
  await forkedProject.$relatedQuery("tags").relate(tagsToRelate.map((tag) => tag.id))
}

export default handleForkProject
