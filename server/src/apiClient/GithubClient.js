import got from "got"
class GithubClient {
  static async getCode(url) {
    const regex = /^https:\/\/github.com\/([^\/]+)\/([^\/]+)\/blob\/main\/(.+)$/
    const match = url.match(regex)
    if (match) {
      const [, owner, repo, path] = match
      console.log(match)
      try {
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
        const apiKey = "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"
        const apiResponse = await got(url, {
          headers: {
            Accept: "application/vnd.github.v3.raw",
            Authorization: `token ${apiKey}`,
          },
        })
        const responseBody = apiResponse.body
        return responseBody
      } catch (error) {
        return { error: error.message }
      }
    } else {
      console.log("no match")
    }
  }
}

export default GithubClient
