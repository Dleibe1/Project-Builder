import { User } from "../models/index.js"
import PartsSerializer from "./PartsSerializer.js"
import TagSerializer from "./TagSerializer.js"
import GithubClient from "../apiClient/GithubClient.js"

class ProjectSerializer {
  static async getProjectListDetails(project) {
    const allowedAttributes = [
      "id",
      "userId",
      "title",
      "appsAndPlatforms",
      "thumbnailImage",
      "parentProjectId",
    ]
    let serializedProject = {}
    for (const attribute of allowedAttributes) {
      serializedProject[attribute] = project[attribute]
    }
    const [relatedUserData, relatedTagsData] = await Promise.all([
      User.query().findOne({ id: project.userId }),
      project.$relatedQuery("tags"),
    ])
    const tagsData = relatedTagsData.map((tag) => {
      return TagSerializer.getTagDetails(tag)
    })
    const userName = relatedUserData.userName || relatedUserData.githubUserName
    serializedProject.user = userName
    serializedProject.tags = tagsData
    return serializedProject
  }

  static async getProjectShowPageDetails(project) {
    const allowedAttributes = [
      "id",
      "userId",
      "title",
      "appsAndPlatforms",
      "description",
      "documentation",
      "code",
      "githubFileURL",
      "thumbnailImage",
      "instructions",
      "parentProjectId",
    ]
    let serializedProject = {}
    for (const attribute of allowedAttributes) {
      serializedProject[attribute] = project[attribute]
    }
    const [relatedUserData, relatedPartsData, relatedTagsData] =
      await Promise.all([
        User.query().findOne({ id: project.userId }),
        project.$relatedQuery("parts"),
        project.$relatedQuery("tags"),
      ])
    const userName = relatedUserData.userName || relatedUserData.githubUserName
    serializedProject.user = userName
    const serializedParts = relatedPartsData.map((part) => {
      return PartsSerializer.getPartDetails(part)
    })
    serializedProject.parts = serializedParts
    const serializedTagsData = relatedTagsData.map((tag) => {
      return TagSerializer.getTagDetails(tag)
    })
    serializedProject.tags = serializedTagsData
    serializedProject.code = project.githubFileURL
      ? await GithubClient.getProjectCode(project.githubFileURL)
      : project.code
    return serializedProject
  }
}

export default ProjectSerializer
