import express from "express"
import { Project } from "../../../models/index.js"
import ProjectSerializer from "../../../Serializers/ProjectSerializer.js"

const searchRouter = new express.Router()

searchRouter.get("/:searchQuery/:projectsPerPage", async (req, res) => {
  const searchQuery = req.params.searchQuery.trim()
  const projectsPerPage = parseInt(req.params.projectsPerPage)
  if (searchQuery) {
    try {
      const projects = await Project.query()
        .orderBy("id", "acs")
        .limit(projectsPerPage)
        .where("title", "ilike", `%${searchQuery}%`)
        .orWhere("description", "ilike", `%${searchQuery}`)
      const serializedProjects = await Promise.all(
        projects.map((project) => {
          return ProjectSerializer.getProjectListDetails(project)
        }),
      )
      res.status(200).json({ projects: serializedProjects })
    } catch (error) {
      console.log(error)
      res.status(500).json({ errors: error })
    }
  } else {
    return res.status(400).json({ errors: "The search query was empty" })
  }
})

export default searchRouter
