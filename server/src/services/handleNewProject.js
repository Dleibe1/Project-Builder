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
  const projectCode = githubFileURL ? await GithubClient.getProjectCode(githubFileURL.trim()) : code
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
  await Promise.all(
    parts.map((part) => {
      return Part.query().insert({ projectId: newProjectId, partName: part.partName })
    }),
  )
  for (const instruction of instructions) {
    await Instruction.query().insert({
      projectId: newProjectId,
      instructionText: instruction.instructionText,
      imageURL: instruction.imageURL,
    })
  }
}

export default handleNewProject
