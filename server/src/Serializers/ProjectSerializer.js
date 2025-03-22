import { User } from "../models/index.js"
import PartsSerializer from "./PartsSerializer.js"
import TagSerializer from "./TagSerializer.js"
import InstructionSerializer from "./InstructionSerializer.js"
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

    const relatedUserData = await User.query().findOne({ id: project.userId })
    const userName = relatedUserData.userName || relatedUserData.githubUserName
    serializedProject.user = userName
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
      "parentProjectId",
    ]
    let serializedProject = {}
    for (const attribute of allowedAttributes) {
      serializedProject[attribute] = project[attribute]
    }
    const [relatedUserData, relatedPartsData, relatedTagsData, relatedInstructionsData] =
      await Promise.all([
        User.query().findOne({ id: project.userId }),
        project.$relatedQuery("parts"),
        project.$relatedQuery("tags"),
        project.$relatedQuery("instructions"),
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
    const serializedInstructions = relatedInstructionsData.map((instruction) => {
      return InstructionSerializer.getInstructionDetails(instruction)
    })
    serializedProject.instructions = serializedInstructions
    serializedProject.code = project.githubFileURL
      ? await GithubClient.getProjectCode(project.githubFileURL)
      : project.code
    return serializedProject
  }
}

export default ProjectSerializer
