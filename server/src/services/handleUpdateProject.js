import { Project, Part, Instruction } from "../models/index.js"

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
  const incomingIds = instructions.map((instruction) => {
    return instruction.id
  })
  //TODO:  Find a more sophisticated way of updating the instructions.
  await Instruction.query().delete().where("projectId", projId)

  await Promise.all(
    instructions.map((instruction) => {
      return Instruction.query().insert({
        projectId: projId,
        instructionText: instruction.instructionText,
        imageURL: instruction.imageURL,
      })
    }),
  )

  const githubFileURLField = githubFileURL ? githubFileURL.trim() : ""
  const existingParts = await Part.query().where("projectId", projId)
  const incomingPartIds = parts.map((part) => part.id).filter(Boolean)
  const partsToDelete = existingParts.filter((part) => !incomingPartIds.includes(part.id))
  const partsToInsert = parts.filter((part) => !part.id)

  if (partsToDelete.length) {
    await Part.query()
      .delete()
      .whereIn(
        "id",
        partsToDelete.map((part) => part.id),
      )
  }
  if (partsToInsert.length) {
    await Part.query().insert(
      partsToInsert.map((part) => ({ projectId: projId, partName: part.partName })),
    )
  }

  await Project.query()
    .update({
      title,
      tags,
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
