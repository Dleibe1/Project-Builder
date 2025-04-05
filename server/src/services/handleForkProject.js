import { Project, Part, Tag } from "../models/index.js"

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
    description: forkData.description,
    code: forkData.code,
    instructions: forkData.instructions,
    parentProjectId,
  })
  const parts = forkData.parts
  const forkedProjectId = parseInt(forkedProject.id)

  if (parts?.length) {
    for (const part of parts) {
      await Part.query().insert({
        projectId: forkedProjectId,
        partName: part.partName,
        partPurchaseURL: part.partPurchaseURL,
      })
    }
  }

  if (forkedProject.tags?.length) {
    const tagsToRelate = await Tag.query()
      .select("id")
      .whereIn(
        "tagName",
        forkedProject.tags.map((tag) => tag.tagName),
      )
    await forkedProject.$relatedQuery("tags").relate(tagsToRelate.map((tag) => tag.id))
  }
}

export default handleForkProject
