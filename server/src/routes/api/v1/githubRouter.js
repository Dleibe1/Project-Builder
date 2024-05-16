import express from "express"
import GithubClient from "../../../apiClient/GithubClient.js"

const githubRouter = new express.Router()

githubRouter.get("/", async (req, res)=>{
  const url = "https://github.com/arduino/lab-micropython-installer/blob/main/index.html"
  const githubResponse = await GithubClient.getCode(url)
})





export default githubRouter