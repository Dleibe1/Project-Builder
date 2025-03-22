import { Project, Part, Tag, Instruction } from "../models/index.js"

const handleUpdateProject = async (
  {
    title,
    tags,
    appsAndPlatforms,
    description,
    code,
    githubFileURL,
    userId,
    parts,
    instructions,
    thumbnailImage,
  },
  projectId,
) => {
  const projId = parseInt(projectId)

  const githubFileURLField = githubFileURL ? githubFileURL.trim() : ""
  const project = await Project.query().findOne({ id: projId })
  const partsToInsert = parts.filter((part) => !part.id)
  const existingPartsData = await project.$relatedQuery("parts")
  const partsToDelete = existingPartsData.filter((existingPartData) => {
    return !parts.map((part) => part.id).includes(existingPartData.id)
  })

  if (partsToDelete.length) {
    await Part.query()
      .delete()
      .whereIn(
        "id",
        partsToDelete.map((part) => part.id),
      )
  }
  if (partsToInsert.length) {
    for (const part of partsToInsert) {
      await Part.query().insert({
        projectId: projId,
        partName: part.partName,
        partPurchaseURL: part.partPurchaseURL,
      })
    }
  }

  const relatedTagsData = await project.$relatedQuery("tags")
  const relatedTagNames = relatedTagsData.map((existingTagData) => existingTagData.tagName)
  const incomingTagNames = tags.map((tag) => tag.tagName)
  const tagNamesToRelate = incomingTagNames.filter(
    (incomingTagName) => !relatedTagNames.includes(incomingTagName),
  )
  const tagNamesToUnRelate = relatedTagNames.filter(
    (relatedTagName) => !incomingTagNames.includes(relatedTagName),
  )

  const tagsToRelate = await Tag.query().select("id").whereIn("tagName", tagNamesToRelate)
  const tagsToUnRelate = await Tag.query().select("id").whereIn("tagName", tagNamesToUnRelate)

  if (tagsToRelate.length) {
    await project.$relatedQuery("tags").relate(tagsToRelate.map((tag) => tag.id))
  }

  if (tagsToUnRelate.length) {
    await project
      .$relatedQuery("tags")
      .unrelate()
      .whereIn(
        "id",
        tagsToUnRelate.map((tag) => tag.id),
      )
  }

  await Instruction.query().delete().where("projectId", projId)
  for (const instruction of instructions) {
    await Instruction.query().insert({
      projectId: projId,
      instructionHTML: instruction.instructionHTML,
    })
  }

  await Project.query()
    .update({
      title,
      appsAndPlatforms,
      description,
      code,
      githubFileURL: githubFileURLField,
      thumbnailImage,
      userId,
    })
    .where("id", projId)
}

export default handleUpdateProject
