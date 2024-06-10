import GithubClient from "../../../apiClient/GithubClient.js";
import express from "express"
import dotenv from "dotenv"
dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID
const BASE_URL = process.env.BASE_URL

const redirectUri = `${BASE_URL}/api/v1/github-user-sessions/handle-callback`

const githubUserSessionsRouter = new express.Router()

githubUserSessionsRouter.get('/login', async (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}`
  res.redirect(githubAuthUrl)
})

githubUserSessionsRouter.get('/handle-callback', async (req, res) => {
  const userLoginCode = req.query.code
  try {
    const tokenData = await GithubClient.exchangeUserLoginCode(userLoginCode)
    if (tokenData.access_token) {
      const userInfo = await GithubClient.getUserInfo(tokenData.access_token)
      const { login, name } = userInfo
      res.redirect(`${BASE_URL}/github-callback?name=${name? name : ""}&login=${login}`)
    }
  }catch(error){
    res.status(500).json({errors: error});
  }
})

export default githubUserSessionsRouter