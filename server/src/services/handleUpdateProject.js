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
  await Part.query().delete().where("projectId", projectId)
  for (const part of parts) {
    await Part.query().insert({ projectId: projId, partName: part.partName })
  }
  for (const instruction of instructions) {
    await  Instruction.query().delete().where("projectId", projectId)
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