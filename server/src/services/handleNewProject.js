import { Project, Part, Tag, Instruction } from "../models/index.js"

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
  const newProject = await Project.query().insert({
    title,
    appsAndPlatforms,
    description,
    code,
    githubFileURL,
    userId,
    thumbnailImage,
    instructions,
  })
  const newProjectId = parseInt(newProject.id)
  await Promise.all(
    parts.map((part) => {
      return Part.query().insert({
        projectId: newProjectId,
        partName: part.partName,
        partPurchaseURL: part.partPurchaseURL,
      })
    }),
  )

  for (const instruction of instructions) {
    await Instruction.query().insert({
      projectId: forkedProjectId,
      instructionHTML: instruction.instructionHTML,
    })
  }

  const tagsToRelate = await Tag.query()
    .select("id")
    .whereIn(
      "tagName",
      tags.map((tag) => tag.tagName),
    )
  await newProject.$relatedQuery("tags").relate(tagsToRelate.map((tag) => tag.id))
}

export default handleNewProject
