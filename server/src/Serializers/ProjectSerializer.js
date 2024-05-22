import { User, Project, Part, Image } from "../models/index.js"
import PartsSerializer from "./PartsSerializer.js"
import ImageSerializer from "./ImagesSerializer.js"
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
      "thumbnailImageURL",
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
      project.githubFileURL && showPage
        ? await ProjectSerializer.getGithubProjectCode(project.githubFileURL)
        : project.code
    return serializedProject
  }

  static async handleNewProject({
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
  }) {
    const projectCode = githubFileURL
      ? await ProjectSerializer.getGithubProjectCode(githubFileURL)
      : code
    const newProject = await Project.query().insert({
      title,
      tags,
      appsAndPlatforms,
      description,
      code: projectCode,
      userId,
      thumbnailImageURL,
    })
    const newProjectId = parseInt(newProject.id)
    for (const part of parts) {
      await Part.query().insert({ projectId: newProjectId, partName: part })
    }
    for (const image of images) {
      await Image.query().insert({ projectId: newProjectId, imageURL: image })
    }
  }

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
    projectId
  ) {
    const projectCode = githubFileURL
      ? await ProjectSerializer.getGithubProjectCode(githubFileURL)
      : code
    const projId = parseInt(projectId)
    await Project.query()
      .update({
        title,
        tags,
        appsAndPlatforms,
        description,
        code,
        githubFileURL,
        thumbnailImageURL,
        userId,
      })
      .where("id", projId)
    await Part.query().delete().where("projectId", projId)
    await Image.query().delete().where("projectId", projId)
    for (const part of parts) {
      console.log(part)
      await Part.query().insert({ projectId: projId, partName: part })
    }
    for (const image of images) {
      console.log(image)
      await Image.query().insert({ projectId: projId, imageURL: image })
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
