import got from "got"
import dotenv from "dotenv"
import { response } from "express"
dotenv.config()
//TODO:  github_app_authorization webhook handling
class GithubClient {
  static async getProjectCode(url) {
    const regex = /^https:\/\/github.com\/([^\/]+)\/([^\/]+)\/blob\/[^\/]+\/(.+)$/
    if (url) {
      const match = url.match(regex)
      if (match) {
        const [, owner, repo, path] = match
        try {
          const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
          const apiKey = process.env.GITHUB_API_KEY
          const apiResponse = await got(url, {
            headers: {
              Accept: "application/vnd.github.v3.raw",
              Authorization: `token ${apiKey}`,
            },
          })
          const responseBody = apiResponse.body
          return responseBody
        } catch (error) {
          console.log(error)
          return `Could not fetch github code from the URL '${url}' Check the main project URL and try again.`
        }
      } else {
        return `Could not fetch github code from the URL '${url}' Check the main project URL and try again.`
      }
    }
  }

  static async exchangeUserLoginCode(code) {
    const CLIENT_ID = process.env.CLIENT_ID
    const CLIENT_SECRET = process.env.CLIENT_SECRET
    try {
      const tokenResponse = await got.post("https://github.com/login/oauth/access_token", {
        json: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: code,
        },
        headers: {
          Accept: "application/json",
        },
        responseType: "json",
      })
      return tokenResponse.body
    } catch (error) {
      console.error("Error exchanging code for token:", error)
    }
  }

  static async getUserInfo(token) {
    try {
      const response = await got.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        responseType: "json",
      })
      return response.body
    } catch (error) {
      console.error("Error fetching user info:", error)
      throw error
    }
  }
}

export default GithubClient
