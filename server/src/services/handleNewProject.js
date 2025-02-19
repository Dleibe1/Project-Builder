import { Project, Part, Tag } from "../models/index.js"
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
    instructions
  })
  const newProjectId = parseInt(newProject.id)
  await Promise.all(
    parts.map((part) => {
      return Part.query().insert({ projectId: newProjectId, partName: part.partName })
    }),
  )

  const tagsToRelate = await Tag.query()
    .select("id")
    .whereIn(
      "tagName",
      tags.map((tag) => tag.tagName),
    )
  await newProject.$relatedQuery("tags").relate(tagsToRelate.map((tag) => tag.id))
}

export default handleNewProject
