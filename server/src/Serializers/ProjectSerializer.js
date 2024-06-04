import { User } from "../models/index.js"
import PartsSerializer from "./PartsSerializer.js"
import ImageSerializer from "./ImagesSerializer.js"
import GithubClient from "../apiClient/GithubClient.js"

class ProjectSerializer {
  static async getProjectDetails(project, checkGithub) {
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
      "thumbnailImageURL",
      "parentProjectId"
    ]
    let serializedProject = {}
    for (const attribute of allowedAttributes) {
      serializedProject[attribute] = project[attribute]
    }
    const relatedUserData = await User.query().findOne({ id: project.userId })
    const relatedPartsData = await project.$relatedQuery("parts")
    const relatedImagesData = await project.$relatedQuery("images")
    const userName = relatedUserData.userName
    serializedProject.user = userName
    const relatedParts = relatedPartsData.map((part) => {
      return PartsSerializer.getPartDetails(part)
    })
    serializedProject.parts = relatedParts
    const relatedImages = relatedImagesData.map((image) => {
      return ImageSerializer.getImageDetails(image)
    })
    serializedProject.images = relatedImages
    serializedProject.code =
      project.githubFileURL && checkGithub
        ? await GithubClient.getCode(project.githubFileURL)
        : project.code
    return serializedProject
  }
}

export default ProjectSerializer
