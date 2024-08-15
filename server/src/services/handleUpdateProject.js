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
  const githubFileURLField = githubFileURL ? githubFileURL : ""
  await Part.query().delete().where("projectId", projId)
  for (const part of parts) {
    await Part.query().insert({ projectId: projId, partName: part.partName })
  }
  await Instruction.query().delete().where("projectId", projId)
  for (const instruction of instructions) {
    await Instruction.query().insert({
      projectId: projId,
      imageURL: instruction.imageURL || "",
      instructionText: instruction.instructionText || "",
    })
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
