import got from "got"
import dotenv from "dotenv"
dotenv.config()

class GithubClient {
  static async getCode(url) {
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
}

export default GithubClient
