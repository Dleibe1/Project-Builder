import express from "express"
import { Project } from "../../../models/index.js"
import ProjectSerializer from "../../../Serializers/ProjectSerializer.js"
import handleForkProject from "../../../services/handleForkProject.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import objection from "objection"
const { ValidationError } = objection

const projectForksRouter = new express.Router({ mergeParams: true })

projectForksRouter.get("/fork-list", async (req, res) => {
  const { parentProjectId } = req.params
  const { page = 1, limit = 12 } = req.query
  const currentPage = parseInt(page)
  const projectsPerPage = parseInt(limit)
  if (
    isNaN(currentPage) ||
    isNaN(projectsPerPage) ||
    isNaN(parentProjectId) ||
    currentPage < 1 ||
    projectsPerPage < 1
  ) {
    return res.status(400).json({ error: "Invalid query parameters" })
  }
  try {
    const forkedProjectCount = await Project.query()
      .where("parentProjectId", parseInt(parentProjectId))
      .resultSize()
    const forkedProjects = await Project.query()
      .orderBy("id", "acs")
      .limit(projectsPerPage)
      .where("parentProjectId", parseInt(parentProjectId))
    const serializedForks = await Promise.all(
      forkedProjects.map((fork) => {
        return ProjectSerializer.getProjectListDetails(fork)
      }),
    )
    res.status(200).json({ forks: serializedForks, forkedProjectCount })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

projectForksRouter.post("/", async (req, res) => {
  const { body, user } = req
  const userId = parseInt(user.id)
  const parentProjectId = parseInt(req.params.parentProjectId)
  try {
    const forkedProjectData = cleanUserInput(body)
    await handleForkProject(parentProjectId, userId, forkedProjectData)
    res.status(201).json({ project: forkedProjectData })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default projectForksRouter
