import connection from "../../../src/boot/model.cjs"

class ProjectTagsSeeder {
  static async seed() {
   const tags = await connection("project_tags").insert([
      { projectId: 1, tagId: 2 },
      { projectId: 1, tagId: 24 },
      { projectId: 1, tagId: 12 },

      { projectId: 2, tagId: 40 },
      { projectId: 2, tagId: 13 },

      { projectId: 3, tagId: 13 },
      { projectId: 3, tagId: 17 },
      { projectId: 3, tagId: 16 },
      { projectId: 3, tagId: 20 },
      { projectId: 3, tagId: 22 },
      { projectId: 3, tagId: 32 },

      { projectId: 4, tagId: 3 },
      { projectId: 4, tagId: 24 },
      { projectId: 4, tagId: 26 },

      { projectId: 5, tagId: 1 },

      { projectId: 6, tagId: 36 },
      { projectId: 6, tagId: 1 },
      { projectId: 6, tagId: 20 },

      { projectId: 7, tagId: 34 },
      { projectId: 7, tagId: 31 },
      { projectId: 7, tagId: 25 },
      { projectId: 7, tagId: 22 },
      { projectId: 7, tagId: 10 },

      { projectId: 8, tagId: 25 },
      { projectId: 8, tagId: 35 },
      { projectId: 8, tagId: 13 },

      { projectId: 11, tagId: 22 },
      { projectId: 11, tagId: 13 },
      { projectId: 11, tagId: 6 },
      { projectId: 11, tagId: 17 },
      { projectId: 11, tagId: 20 },
      { projectId: 11, tagId: 25 },
      { projectId: 11, tagId: 40 },

      { projectId: 12, tagId: 1 },
      { projectId: 12, tagId: 7 },
      { projectId: 12, tagId: 10 },

      { projectId: 13, tagId: 1 },
      { projectId: 13, tagId: 31 },
      { projectId: 13, tagId: 10 },
      { projectId: 13, tagId: 13 },

      { projectId: 14, tagId: 15 },
      { projectId: 14, tagId: 12 },

      { projectId: 15, tagId: 4 },
      { projectId: 15, tagId: 6 },
      { projectId: 15, tagId: 10 },
      { projectId: 15, tagId: 23 },
      { projectId: 15, tagId: 35 },

      { projectId: 16, tagId: 31 },

      { projectId: 17, tagId: 13 },

      { projectId: 18, tagId: 20 },
      { projectId: 18, tagId: 32 },

      { projectId: 19, tagId: 2 },
      { projectId: 19, tagId: 24 },
      { projectId: 19, tagId: 12 },

      { projectId: 20, tagId: 40 },
      { projectId: 20, tagId: 13 },
    ])
    const insertedTags = await connection("project_tags").select()
  }
}

export default ProjectTagsSeeder
