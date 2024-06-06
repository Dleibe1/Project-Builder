import express from "express"
import TestImageUpload from "../../../models/TestImageUpload.js"
import uploadImage from "../../../services/uploadImage.js"

const imageUploadRouter = new express.Router()

imageUploadRouter.get("/", async (req, res) => {
  try {
    const memes = await TestImageUpload.query()
    return res.status(200).json({ memes })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

// The setup and implementation for this endpoint will be explained in a different article! 

imageUploadRouter.post("/", uploadImage.single("image"), async (req, res) => {
  try {
    const { body } = req
    const imageURL = req.file.location
    console.log(req.file.location)

    return res.status(201).json({ imageURL })
  } catch (error) {
    console.log(error)
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default imageUploadRouter