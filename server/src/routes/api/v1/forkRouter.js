import express from "express"
import { Project } from "../../../models/index.js"
import ProjectSerializer from "../../../Serializers/ProjectSerializer.js"

const forkRouter = new express.Router()

forkRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const userBuild = await Project.query().findById(id)
    let serializedUserBuild = await ProjectSerializer.getProjectDetails(userBuild, true)
    const partNames = serializedUserBuild.parts.map(part => {
      return part.partName
    })
    const imageUrls = serializedUserBuild.images.map(imageData => {
      return imageData.imageURL
    })
    serializedUserBuild.parts = partNames
    serializedUserBuild.images = imageUrls
    return res.status(200).json({ userBuild: serializedUserBuild })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default forkRouter