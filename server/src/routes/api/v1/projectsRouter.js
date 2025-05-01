import express from "express"
import { Project, Part } from "../../../models/index.js"
import ProjectSerializer from "../../../Serializers/ProjectSerializer.js"
import objection from "objection"
import handleNewProject from "../../../services/handleNewProject.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import projectForksRouter from "./projectForksRouter.js"
const { ValidationError } = objection

const projectsRouter = new express.Router()

projectsRouter.use("/:parentProjectId/forks", projectForksRouter)

projectsRouter.get("/", async (req, res) => {
  const { page = 1, limit = 12, tag = "" } = req.query
  const currentPage = parseInt(page)
  const projectsPerPage = parseInt(limit)
  if (isNaN(currentPage) || isNaN(projectsPerPage) || currentPage < 1 || projectsPerPage < 1) {
    return res.status(400).json({ error: "Invalid query parameters" })
  }
  try {
    let projectsQuery = Project.query().whereNull("parentProjectId").orderBy("projects.id", "asc")
    let projectCount = await projectsQuery.resultSize()
    if (tag.trim().length) {
      projectsQuery = projectsQuery.joinRelated("tags").where("tags.tagName", tag)
      projectCount = await projectsQuery.resultSize()
    }
    projectsQuery = projectsQuery.limit(projectsPerPage).offset((currentPage - 1) * projectsPerPage)
    const projects = await projectsQuery
    const serializedProjects = await Promise.all(
      projects.map((project) => {
        return ProjectSerializer.getProjectListDetails(project)
      }),
    )
    return res.status(200).json({ projects: serializedProjects, projectCount })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errors: err })
  }
})

projectsRouter.get("/check-for-forks/:id", async (req, res) => {
  const { id } = req.params
  try {
    const forkExists = (await Project.query().findOne({ parentProjectId: id })) ? true : false
    res.status(200).json({ forkExists })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

projectsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
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
  const projectId = parseInt(req.params.id)
  const loggedInUser = req.user
  try {
    const currentProject = await Project.query().findById(projectId)
    if (currentProject.userId === loggedInUser.id) {
      const forksOfThisProject = await Project.query().where("parentProjectId", projectId)
      await Promise.all([
        ...forksOfThisProject.map((fork) => {
          return Project.query().patch({ parentProjectId: null }).where("id", parseInt(fork.id))
        }),
        Part.query().delete().where("projectId", projectId),
        Project.query().deleteById(projectId),
      ])
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
    console.log(body)
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
