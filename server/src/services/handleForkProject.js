import { Project, Part, Instruction, Tag } from "../models/index.js"

const handleForkProject = async (parentProjectId, userId, forkData) => {
  const originalProject = await Project.query().findById(parentProjectId)
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
    parentProjectId,
  })
  const parts = forkData.parts
  const instructions = forkData.instructions
  const forkedProjectId = parseInt(forkedProject.id)

  await Promise.all(
    parts.map((part) => {
      return Part.query().insert({ projectId: forkedProjectId, partName: part.partName })
    }),
  )

  for (const instruction of instructions) {
    await Instruction.query().insert({
      projectId: forkedProjectId,
      instructionText: instruction.instructionText,
      imageURL: instruction.imageURL,
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
