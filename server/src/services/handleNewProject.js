import { Project, Part, Instruction } from "../models/index.js"
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
  instructions,
  thumbnailImage,
}) => {
  const projectCode = githubFileURL ? await GithubClient.getProjectCode(githubFileURL) : code
  const newProject = await Project.query().insert({
    title,
    tags,
    appsAndPlatforms,
    description,
    code: projectCode,
    userId,
    thumbnailImage,
  })
  const newProjectId = parseInt(newProject.id)
  await Project.query().patchAndFetchById(newProjectId, {
    parentProjectId: newProjectId,
  })
  for (const part of parts) {
    await Part.query().insert({ projectId: newProjectId, partName: part })
  }
  for (const instruction of instructions) {
    await Instruction.query().insert({
      projectId: newProjectId,
      imageURL: instruction.imageURL,
      instructionText: instruction.instructionText,
    })
  }
}

export default handleNewProject
