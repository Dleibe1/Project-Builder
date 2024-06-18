import ProjectSerializer from "./ProjectSerializer.js"

class UserSerializer {
  static async getUserProjects(user) {
    const allowedAttributes = ["id", "email", "userName"]
    let serializedUser = {}
    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute]
    }
    const relatedProjectsData = await user.$relatedQuery("projects")
    serializedUser.projects = await Promise.all(
      relatedProjectsData.map(async (project) => {
        return await ProjectSerializer.getProjectDetails(project)
      }),
    )
    return serializedUser
  }
  static getGithubUserInfo (githubUser) {
    let serializedGithubUser = githubUser[0]
    const userName = githubUser[0].githubUserName
    serializedGithubUser.userName = userName
    return serializedGithubUser
  }
}

export default UserSerializer
