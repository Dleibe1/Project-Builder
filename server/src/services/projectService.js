import { Project } from "../models/index.js"

class ProjectService {
  static async forkProject(originalProjectId, userId, forkData) {
    const originalProject = await Project.query().findById(originalProjectId)
    if (!originalProject) {
      throw new Error("Original project not found")
    }
    const newProject = await Project.query().insert({
      userId: parseInt(userId),
      githubFileURL: forkData.githubFileURL || originalProject.githubFileURL,
      thumbnailImageURL: forkData.thumbnailImageURL || originalProject.thumbnailImageURL,
      title: forkData.title || originalProject.title,
      appsAndPlatforms: forkData.appsAndPlatforms || originalProject.appsAndPlatforms,
      tags: forkData.tags || originalProject.tags,
      description: forkData.description || originalProject.description,
      documentation: forkData.documentation || originalProject.documentation,
      code: forkData.code || originalProject.code,
      parentProjectId: originalProjectId,
    })
    return newProject
  }
}

export default ProjectService
