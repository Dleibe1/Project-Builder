import { Project, Part, Instruction, Tag } from "../models/index.js"
import connection from "../../src/boot/model.cjs"
import GithubClient from "../apiClient/GithubClient.js"

const handleNewProject = async ({
  title,
  appsAndPlatforms,
  description,
  code,
  tags,
  githubFileURL,
  userId,
  parts,
  instructions,
  thumbnailImage,
}) => {
  const projectCode = githubFileURL ? await GithubClient.getProjectCode(githubFileURL.trim()) : code
  const newProject = await Project.query().insert({
    title,
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
  await Promise.all(
    tags.map(async (tag) => {
     const tagId = await Tag.query().where("tagName", tag).select('id')
     console.log(tagId)
    })
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
