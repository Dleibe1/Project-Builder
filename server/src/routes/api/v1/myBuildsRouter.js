import express from "express"
import { Project } from "../../../models/index.js"
import ProjectSerializer from "../../../Serializers/ProjectSerializer.js"
import handleUpdateProject from "../../../services/handleUpdateProject.js"
import objection from "objection"
const { ValidationError } = objection
import cleanUserInput from "../../../services/cleanUserInput.js"

const myBuildsRouter = new express.Router()

myBuildsRouter.get("/", async (req, res) => {
  let user = {}
  if (req.user) {
    user = req.user
  }
  try {
    const userBuilds = await Project.query().where("userId", parseInt(user.id))
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
    let serializedUserBuild = await ProjectSerializer.getProjectDetails(userBuild, true)
    const partNamesArray = serializedUserBuild.parts.map((part) => {
      return part.partName
    })
    const imageUrlsArray = serializedUserBuild.images.map((imageData) => {
      return imageData.imageURL
    })
    serializedUserBuild.parts = partNamesArray
    serializedUserBuild.images = imageUrlsArray
    return res.status(200).json({ userBuild: serializedUserBuild })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

myBuildsRouter.patch("/:id", async (req, res) => {
  const { body } = req
  const projectId = req.params.id
  try {
    const formInput = cleanUserInput(body)
    await handleUpdateProject(formInput, projectId)
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
