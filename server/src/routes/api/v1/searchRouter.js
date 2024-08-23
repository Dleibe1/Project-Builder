import express from "express"
import { Project } from "../../../models/index.js"
import ProjectSerializer from "../../../Serializers/ProjectSerializer.js"

const searchRouter = new express.Router()

searchRouter.get("/:searchQuery/:currentPage/:projectsPerPage", async (req, res) => {
  const searchQuery = req.params.searchQuery.trim()
  const currentPage = parseInt(req.params.currentPage) || 1
  const projectsPerPage = parseInt(req.params.projectsPerPage)
  try {
    const projectCount = await Project.query()
      .whereRaw('id = "parentProjectId"')
      .where((builder) => {
        builder
          .where("title", "ilike", `%${searchQuery}%`)
          .orWhere("description", "ilike", `%${searchQuery}%`)
      })
      .resultSize()
    const projects = await Project.query()
      .orderBy("id", "acs")
      .limit(projectsPerPage)
      .whereRaw('id = "parentProjectId"')
      .where((builder) => {
        builder
          .where("title", "ilike", `%${searchQuery}%`)
          .orWhere("description", "ilike", `%${searchQuery}%`)
      })
      .offset((currentPage - 1) * projectsPerPage)
    const serializedProjects = await Promise.all(
      projects.map((project) => {
        return ProjectSerializer.getProjectListDetails(project)
      }),
    )
    res.status(200).json({ projects: serializedProjects, projectCount })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

export default searchRouter
