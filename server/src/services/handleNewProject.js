import { Project, Part, Image } from "../models/index.js"
import GithubClient from "../apiClient/GithubClient.js"

const handleNewProject = async ({
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
}) => {
  const projectCode = githubFileURL ? await GithubClient.getProjectCode(githubFileURL) : code
  const newProject = await Project.query().insert({
    title,
    tags,
    appsAndPlatforms,
    description,
    code: projectCode,
    userId,
    thumbnailImageURL,
  })
  const newProjectId = parseInt(newProject.id)
  await Project.query().patchAndFetchById(newProjectId, {
    parentProjectId: newProjectId,
  })
  for (const part of parts) {
    await Part.query().insert({ projectId: newProjectId, partName: part })
  }
  for (const image of images) {
    await Image.query().insert({ projectId: newProjectId, imageURL: image })
  }
}

export default handleNewProject
