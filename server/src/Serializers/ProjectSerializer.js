import { User } from "../models/index.js"
import PartsSerializer from "./PartsSerializer.js"
import InstructionSerializer from "./InstructionSerializer.js"
import GithubClient from "../apiClient/GithubClient.js"

class ProjectSerializer {
  static async getProjectListDetails(project) {
    const allowedAttributes = [
      "id",
      "userId",
      "title",
      "appsAndPlatforms",
      "tags",
      "thumbnailImage",
      "parentProjectId"
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

  static async getProjectShowPageDetails(project){
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
      "thumbnailImage",
      "parentProjectId"
    ]
    let serializedProject = {}
    for (const attribute of allowedAttributes) {
      serializedProject[attribute] = project[attribute]
    }
    const relatedUserData = await User.query().findOne({ id: project.userId })
    const relatedPartsData = await project.$relatedQuery("parts")
    const instructionsData = await project.$relatedQuery("instructions")
    const userName = relatedUserData.userName || relatedUserData.githubUserName
    serializedProject.user = userName
    const relatedParts = relatedPartsData.map((part) => {
      return PartsSerializer.getPartDetails(part)
    })
    serializedProject.parts = relatedParts
    const relatedInstructions = instructionsData.map((instruction) => {
      return InstructionSerializer.getInstructionDetails(instruction)
    })
    serializedProject.instructions = relatedInstructions
    serializedProject.code =
      project.githubFileURL
        ? await GithubClient.getProjectCode(project.githubFileURL)
        : project.code
    return serializedProject
  }
}

export default ProjectSerializer
