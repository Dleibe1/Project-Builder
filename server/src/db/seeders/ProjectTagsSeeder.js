import { connection } from "../../boot.js"

class ProjectTagsSeeder {
  static async seed() {
    await connection("project_tags").insert([
      { projectId: 1, tagId: 2 },
      { projectId: 1, tagId: 24 },
      { projectId: 1, tagId: 12 },
    ])
  }
}

export default ProjectTagsSeeder
