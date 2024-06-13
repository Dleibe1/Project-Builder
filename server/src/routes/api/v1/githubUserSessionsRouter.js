import GithubClient from "../../../apiClient/GithubClient.js"
import { User } from "../../../models/index.js"
import express from "express"
import dotenv from "dotenv"

dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID
const BASE_URL = process.env.BASE_URL

const githubUserSessionsRouter = new express.Router()

githubUserSessionsRouter.get("/login", async (req, res) => {
  const redirectUri = `${BASE_URL}/api/v1/github-user-sessions/handle-callback`
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}`
  res.json({ githubAuthUrl })
})

githubUserSessionsRouter.get("/handle-callback", async (req, res) => {
  const userLoginCode = req.query.code
  try {
    const tokenData = await GithubClient.exchangeUserLoginCode(userLoginCode)
    if (tokenData.access_token) {
      console.log(tokenData)
      req.session.githubAccessToken = tokenData.access_token
      const userInfo = await GithubClient.getUserInfo(tokenData.access_token)
      const { login, name } = userInfo
      req.session.githubLogin = login
      req.session.githubName = name ? name : ""
      const existingUser = await User.query().where({
        loginMethod: "github",
        githubUserName: login,
      })
      if (!existingUser.length) {
        await User.query().insert({ loginMethod: "github", githubUserName: login })
      }
      res.redirect(`${BASE_URL}/github-callback?name=${name ? name : ""}&login=${login}`)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

githubUserSessionsRouter.get("/repos", async (req, res) => {
  const token = req.session.githubAccessToken
  try {
    const repos = await GithubClient.getUserRepos(token)
    res.json(repos)
  } catch (error) {
    res.status(500).json({ errors: error })
  }
})

export default githubUserSessionsRouter
