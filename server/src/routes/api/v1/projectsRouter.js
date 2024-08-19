import express from "express"
import { Project, Part, Instruction } from "../../../models/index.js"
import ProjectSerializer from "../../../Serializers/ProjectSerializer.js"
import objection from "objection"
import handleNewProject from "../../../services/handleNewProject.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
const { ValidationError } = objection

const projectsRouter = new express.Router()

projectsRouter.get("/page/:currentPage/:projectsPerPage", async (req, res) => {
  const currentPage = parseInt(req.params.currentPage) || 1
  const projectsPerPage = parseInt(req.params.projectsPerPage)
  try {
    const projectCount = await Project.query().whereRaw('id = "parentProjectId"').resultSize()
    const projects = await Project.query()
      .orderBy("createdAt", "desc")
      .limit(projectsPerPage)
      .whereRaw('id = "parentProjectId"')
      .offset((currentPage - 1) * projectsPerPage)
    const serializedProjects = await Promise.all(
      projects.map((project) => {
        return ProjectSerializer.getProjectListDetails(project)
      }),
    )
    res.status(200).json({ projects: serializedProjects, projectCount })
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: err })
  }
})

projectsRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const project = await Project.query().findById(id)
    const serializedProject = await ProjectSerializer.getProjectShowPageDetails(project)
    return res.status(200).json({ project: serializedProject })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

projectsRouter.delete("/:id", async (req, res) => {
  const projectId = req.params.id
  const loggedInUser = req.user
  try {
    if (currentProject.userId === loggedInUser.id) {
      const forksOfThisProject = await Project.query().where("parentProjectId", projectId)
      await Promise.all(
        forksOfThisProject.map((fork) =>
          Project.query().patch({ parentProjectId: fork.id }).where("id", fork.id),
        ),
      )
      await Part.query().delete().where("projectId", projectId)
      await Instruction.query().delete().where("projectId", projectId)
      await Project.query().deleteById(projectId)
      return res.status(200).json({})
    } else {
      return res.status(400).json({ errors: "The current user is not the creator of this project" })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

projectsRouter.post("/new-project", async (req, res) => {
  const { body } = req
  try {
    const formInput = cleanUserInput(body)
    await handleNewProject(formInput)
    res.status(201).json({ project: formInput })
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
