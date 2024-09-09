import express from "express"
import { Project } from "../../../models/index.js"
import ProjectSerializer from "../../../Serializers/ProjectSerializer.js"
import handleUpdateProject from "../../../services/handleUpdateProject.js"
import objection from "objection"
const { ValidationError } = objection
import cleanUserInput from "../../../services/cleanUserInput.js"

const myBuildsRouter = new express.Router()

myBuildsRouter.get("/", async (req, res) => {
  const { page = 1, limit = 12 } = req.query
  const currentPage = parseInt(page)
  const projectsPerPage = parseInt(limit)
  const currentUser = req.user ? req.user : null
  if (currentUser) {
    if (isNaN(currentPage) || isNaN(projectsPerPage) || currentPage < 1 || projectsPerPage < 1) {
      return res.status(400).json({ error: "Invalid query parameters" })
    }
    try {
      const userBuildCount = await Project.query()
        .where("userId", parseInt(currentUser.id))
        .resultSize()
      const userBuildsList = await Project.query()
        .orderBy("id", "acs")
        .limit(projectsPerPage)
        .where("userId", parseInt(currentUser.id))
        .offset((currentPage - 1) * projectsPerPage)
      const serializedUserBuilds = await Promise.all(
        userBuildsList.map((userBuild) => {
          return ProjectSerializer.getProjectListDetails(userBuild)
        })
      )
      res.status(200).json({ userBuilds: serializedUserBuilds, userBuildCount })
    } catch (error) {
      console.log(error)
      res.status(500).json({ errors: error })
    }
  } else {
    return res.status(400).json({ errors: "There is no logged in user." })
  }
})

myBuildsRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const userBuild = await Project.query().findById(id)
    const serializedUserBuild = await ProjectSerializer.getProjectShowPageDetails(userBuild)
    return res.status(200).json({ userBuild: serializedUserBuild })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

myBuildsRouter.patch("/:id", async (req, res) => {
  const { body } = req
  const loggedInUser = req.user
  const projectId = req.params.id
  try {
    const formInput = cleanUserInput(body)
    const currentProject = await Project.query().findOne("id", projectId)
    if (currentProject.userId === loggedInUser.id) {
      await handleUpdateProject(formInput, projectId)
    } else {
      return res.status(400).json({ errors: "The current user is not the creator of this project" })
    }
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

export default myBuildsRouter
