import { User } from "../models/index.js"

class ProjectSerializer {
  static async getProjectDetails(project) {
    const allowedAttributes = ["id", "userId", "title", "parts", "appsAndPlatforms", "tags", "description", "documentation", "code"]
    let serializedProject = {}
    for (const attribute of allowedAttributes) {
      serializedProject[attribute] = project[attribute]
    }
    const relatedUserData = await User.query().findOne({id: project.userId})
    const userName = relatedUserData.userName
    serializedProject.user = userName
    return serializedProject
  }
}

export default ProjectSerializer