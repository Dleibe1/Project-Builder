import { User, Project, Part, Image } from "../models/index.js"
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
  //TODO: USE knex TRANSACTIONS! MOVE THESE TO PROJECT SERVICE FILE

  static async handleUpdateProject(
    {
      title,
      tags,
      appsAndPlatforms,
      description,
      code,
      githubFileURL,
      userId,
      parts,
      images,
      thumbnailImageURL,
    },
    projectId,
  ) {
    const projId = parseInt(projectId)
    const githubFileURLField = githubFileURL ? githubFileURL : ""
    await Part.query().delete().where("projectId", projectId)
    await Image.query().delete().where("projectId", projectId)
    for (const partName of parts) {
      await Part.query().insert({ projectId: projId, partName: partName })
    }
    for (const imageURL of images) {
      await Image.query().insert({ projectId: projId, imageURL: imageURL })
    }
    await Project.query()
      .update({
        title,
        tags,
        appsAndPlatforms,
        description,
        code,
        githubFileURL : githubFileURLField,
        thumbnailImageURL,
        userId,
      })
      .where("id", projId)
  }
}

export default ProjectSerializer
