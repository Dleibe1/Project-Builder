import got from "got"

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
          return `Could not fetch code from GitHub from the URL:  "${url}"`
        }
      } else {
        return `Could not fetch code from GitHub at the URL:  "${url}"`
      }
    }
  }
}

export default GithubClient
