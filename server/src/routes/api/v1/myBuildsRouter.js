import express from "express"
import { Project } from "../../../models/index.js"
import ProjectSerializer from "../../../Serializers/ProjectSerializer.js"

const myBuildsRouter = new express.Router()

myBuildsRouter.get("/", async (req, res) => {
  const { user } = req
  try {
    const userBuilds = await Project.query().where("userId", user.id)
    const serializedUserBuilds = await Promise.all(
      userBuilds.map((userBuild) => {
        return ProjectSerializer.getProjectDetails(userBuild, false)
      }),
    )
    res.status(200).json({ userBuilds: serializedUserBuilds })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

myBuildsRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const userBuild = await Project.query().findById(id)
    const serializedUserBuild = await ProjectSerializer.getProjectDetails(userBuild, true)
    return res.status(200).json({ userBuild: serializedUserBuild })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default myBuildsRouter
