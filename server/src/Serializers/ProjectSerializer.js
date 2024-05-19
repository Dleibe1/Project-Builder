import { User, Project, Part } from "../models/index.js"
import PartsSerializer from "./PartsSerializer.js"
import GithubClient from "../apiClient/GithubClient.js"

class ProjectSerializer {
  static async getProjectDetails(project, showPage) {
    const allowedAttributes = [
      "id",
      "userId",
      "title",
      "appsAndPlatforms",
      "tags",
      "description",
      "documentation",
      "code",
      "githubFileURL",
      "thumbnailImageURL"
    ]
    let serializedProject = {}
    for (const attribute of allowedAttributes) {
      serializedProject[attribute] = project[attribute]
    }
    const relatedUserData = await User.query().findOne({ id: project.userId })
    const relatedPartsData = await project.$relatedQuery("parts")
    const userName = relatedUserData.userName
    serializedProject.user = userName
    const relatedParts = relatedPartsData.map((part) => {
      return PartsSerializer.getPartDetails(part)
    })
    serializedProject.parts = relatedParts
    serializedProject.code = project.githubFileURL && showPage ? await ProjectSerializer.getGithubProjectCode(project.githubFileURL) : project.code
    return serializedProject
  }

  static async handleNewProject({
    title,
    tags,
    appsAndPlatforms,
    description,
    userManuallyEnteredCode,
    githubFileURL,
    userId,
    parts,
    thumbnailImageURL
  }) {
    const projectCode = githubFileURL ? await ProjectSerializer.getGithubProjectCode(githubFileURL) : userManuallyEnteredCode
    const newProject = await Project.query().insert({
      title,
      tags,
      appsAndPlatforms,
      parts,
      description,
      code: projectCode,
      userId,
      thumbnailImageURL
    })
    const newProjectId = parseInt(newProject.id)
    for (const part of parts) {
      await Part.query().insert({ projectId: newProjectId, partName: part })
    }
  }
  static async getGithubProjectCode(githubFileURL) {
    const regex = /^https:\/\/github.com\/([^\/]+)\/([^\/]+)\/blob\/[^\/]+\/(.+)$/
    if (githubFileURL.match(regex)) {
      return await GithubClient.getCode(githubFileURL)
    }
    return `Could not fetch github code from the URL '${githubFileURL}'`
  }
}

export default ProjectSerializer
