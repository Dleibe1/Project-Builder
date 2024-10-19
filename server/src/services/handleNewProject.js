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
  const partInsertions = parts.map((part) => {
    return Part.query().insert({ projectId: newProjectId, partName: part.partName })
  })
  const instructionInsertions = await instructions.map((instruction) => {
    if (instruction.imageURL) {
      return Instruction.query().insert({
        projectId: newProjectId,
        imageURL: instruction.imageURL,
      })
    } else if (instruction.instructionText) {
      return Instruction.query().insert({
        projectId: newProjectId,
        instructionText: instruction.instructionText,
      })
    }
  })
  await Promise.all([...partInsertions, ...instructionInsertions])
}

export default handleNewProject
