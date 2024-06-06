import express from "express"
import TestImageUpload from "../../../models/TestImageUpload.js"
import uploadImage from "../../../services/uploadImage.js"

const imageUploadTestRouter = new express.Router()

imageUploadTestRouter.get("/", async (req, res) => {
  try {
    const memes = await TestImageUpload.query()
    return res.status(200).json({ memes })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

// The setup and implementation for this endpoint will be explained in a different article! 

imageUploadTestRouter.post("/", uploadImage.single("image"), async (req, res) => {
  try {
    const { body } = req
    const data = {
      ...body,
      image: req.file.location,
    }

    console.log(req.file.location)
    console.log("MADE IT")
    
    const meme = await TestImageUpload.query().insertAndFetch(data)
    return res.status(201).json({ meme })
  } catch (error) {
    console.log(error)
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default imageUploadTestRouter