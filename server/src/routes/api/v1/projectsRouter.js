import express from "express"
import { Project } from "../../../models/index.js"
import ProjectSerializer from "../../../Serializers/ProjectSerializer.js"
import objection from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
const { ValidationError } = objection

const projectsRouter = new express.Router()

projectsRouter.get("/", async (req, res) => {
  try {
    const projects = await Project.query()
    const serializedProjects = await Promise.all(
      projects.map((project) => {
        return ProjectSerializer.getProjectDetails(project)
      }),
    )
    res.status(200).json({ projects: serializedProjects })
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: err })
  }
})

projectsRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const project = await Project.query().findById(id)
    const serializedProject = await ProjectSerializer.getProjectDetails(project)
    return res.status(200).json({ project: serializedProject })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})
  
projectsRouter.post("/", async (req, res) => {
  const { body } = req
  try {
    const formInput = cleanUserInput(body)
    const newProjectEntry = await Project.query().insertAndFetch(formInput)
    res.status(201).json({ project: newProjectEntry })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default projectsRouter
