import { Strategy as OAuth2Strategy } from "passport-oauth2"
import got from "got"
import { User } from "../models/index.js"
import dotenv from "dotenv"
dotenv.config()

const githubPassportStrategy = new OAuth2Strategy(
  {
    authorizationURL: "https://github.com/login/oauth/authorize",
    tokenURL: "https://github.com/login/oauth/access_token",
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/api/v1/github-user-sessions/handle-callback`,
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, cb) => {
    try {
      const response = await got.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        responseType: "json",
      })
      const userInfo = response.body
      const { login, avatar_url } = userInfo
      let user = await User.query().findOne({
        loginMethod: "github",
        githubUserName: login,
      })
      if (!user) {
        user = await User.query().insertAndFetch({
          loginMethod: "github",
          githubUserName: login,
          githubAvatarURL: avatar_url,
        })
      } else {
        user = await user.$query().patchAndFetch({ githubAvatarURL: avatar_url })
      }
      req.session.githubAccessToken = accessToken
      return cb(null, user)
    } catch (error) {
      console.error("Error fetching user info:", error)
      return cb(error)
    }
  },
)

export default githubPassportStrategy
