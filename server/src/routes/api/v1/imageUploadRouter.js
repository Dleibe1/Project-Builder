import express from "express"
import uploadImage from "../../../services/uploadImage.js"
import { ImageCounter } from "../../../models/index.js"

const imageUploadRouter = new express.Router()

const IMAGE_UPLOAD_LIMIT = 400

const checkUploadLimit = async (req, res, next) => {
  try {
    const countResult = await ImageCounter.query().count("* as total")
    const totalUploads = parseInt(countResult[0].total)

    if (totalUploads >= IMAGE_UPLOAD_LIMIT) {
      return res.status(403).json({
        errors: ["Image upload limit reached. Please contact the administrator."],
      })
    }
    req.totalUploads = totalUploads
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
}

imageUploadRouter.post("/", checkUploadLimit, uploadImage.single("image"), async (req, res) => {
  try {
    const imageURL = req.file.location
    const newImageEntry = await ImageCounter.query().insert({ imageURL })
    console.log(req.totalUploads)
    return res.status(201).json({ imageURL, totalUploads: req.totalUploads + 1 })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default imageUploadRouter
