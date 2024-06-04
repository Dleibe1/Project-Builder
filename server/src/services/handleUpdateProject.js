import { Project, Part, Image } from "../models/index.js"

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
    images,
    thumbnailImageURL,
  },
  projectId,
) => {
  const projId = parseInt(projectId)
  const githubFileURLField = githubFileURL ? githubFileURL : ""
  await Part.query().delete().where("projectId", projectId)
  await Image.query().delete().where("projectId", projectId)
  for (const partName of parts) {
    await Part.query().insert({ projectId: projId, partName: partName })
  }
  for (const imageURL of images) {
    await Image.query().insert({ projectId: projId, imageURL: imageURL })
  }
  await Project.query()
    .update({
      title,
      tags,
      appsAndPlatforms,
      description,
      code,
      githubFileURL: githubFileURLField,
      thumbnailImageURL,
      userId,
    })
    .where("id", projId)
}

export default handleUpdateProject