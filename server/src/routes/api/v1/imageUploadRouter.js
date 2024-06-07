import express from "express"
import uploadImage from "../../../services/uploadImage.js"

const imageUploadRouter = new express.Router()

imageUploadRouter.post("/", uploadImage.single("image"), async (req, res) => {
  try {
    const imageURL = req.file.location
    return res.status(201).json({ imageURL })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default imageUploadRouter