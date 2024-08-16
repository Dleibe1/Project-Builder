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
  projectId
) => {
  const projId = parseInt(projectId)
  const githubFileURLField = githubFileURL ? githubFileURL : ""
  const existingParts = await Part.query().where("projectId", projId)
  const existingInstructions = await Instruction.query().where("projectId", projId)

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
  const incomingInstructionIds = instructions.map((instruction) => instruction.id).filter(Boolean)
  const instructionsToDelete = existingInstructions.filter(
    (instruction) => !incomingInstructionIds.includes(instruction.id),
  )
  if (instructionsToDelete.length) {
    await Instruction.query()
      .delete()
      .whereIn(
        "id",
        instructionsToDelete.map((instruction) => instruction.id),
      )
  }
  const instructionsToInsert = instructions.filter((instruction) => !instruction.id)
  if (instructionsToInsert.length) {
    await Instruction.query().insert(
      instructionsToInsert.map((instruction) => ({
        projectId: projId,
        imageURL: instruction.imageURL || "",
        instructionText: instruction.instructionText || "",
      })),
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
