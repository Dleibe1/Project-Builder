import express from "express"
import { Project } from "../../../models/index.js"
import ProjectSerializer from "../../../Serializers/ProjectSerializer.js"
import ProjectService from "../../../services/ProjectService.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import objection from "objection"
const { ValidationError } = objection

const forkRouter = new express.Router()

forkRouter.get("/:id/fork-list", async (req, res) => {
  const { id } = req.params
  try {
    const forks = await Project.query().where("parentProjectId", parseInt(id))
    const serializedForks = await Promise.all(
      forks.map((fork) => {
          return ProjectSerializer.getProjectDetails(fork, false)
      })
    )
    res.status(200).json({ forks: serializedForks })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

forkRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const fork = await Project.query().findById(id)
    let serializedForkData = await ProjectSerializer.getProjectDetails(fork, true)
    const partNames = serializedForkData.parts.map((part) => {
      return part.partName
    })
    const imageUrls = serializedForkData.images.map((imageData) => {
      return imageData.imageURL
    })
    serializedForkData.parts = partNames
    serializedForkData.images = imageUrls
    serializedForkData.title = ""
    serializedForkData.description = ""
    return res.status(200).json({ fork: serializedForkData })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

forkRouter.post("/:id", async (req, res) => {
  const { body, user } = req
  const originalProjectId = parseInt(req.params.id)
  const userId = parseInt(user.id)
  try {
    const forkProjectFormInput = cleanUserInput(body)
    await ProjectService.forkProject(originalProjectId, userId, forkProjectFormInput)
    res.status(201).json({ project: forkProjectFormInput })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default forkRouter
