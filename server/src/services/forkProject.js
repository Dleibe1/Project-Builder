import { Project } from "../models/index.js"

const forkProject = async (originalProjectId, userId, forkData) => {
  const originalProject = await Project.query().findById(originalProjectId)
  if (!originalProject) {
    throw new Error("Original project not found")
  }
  const newProject = await Project.query().insert({
    userId: parseInt(userId),
    githubFileURL: forkData.githubFileURL,
    thumbnailImage: forkData.thumbnailImage || originalProject.thumbnailImage,
    title: forkData.title,
    appsAndPlatforms: forkData.appsAndPlatforms || originalProject.appsAndPlatforms,
    tags: forkData.tags || originalProject.tags,
    description: forkData.description,
    documentation: forkData.documentation || originalProject.documentation,
    code: forkData.code || originalProject.code,
    parentProjectId: originalProjectId,
  })
  return newProject
}

export default forkProject
