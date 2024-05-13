import express from "express"
import { Project } from "../../../models/index.js"
import ProjectSerializer from "../../../Serializers/ProjectSerializer.js"

const projectsRouter = new express.Router()

projectsRouter.get("/", async (req, res) => {
  try {
    const projects = await Project.query()
    const serializedProjects = await Promise.all(
      projects.map((project) => {
        return ProjectSerializer.getProjectDetails(project)
      }),
    )
    console.log(serializedProjects)
    res.status(200).json({ projects: serializedProjects })
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: err })
  }
})

export default projectsRouter
