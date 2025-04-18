import passport from "passport"
import express from "express"
const githubUserSessionsRouter = new express.Router()

githubUserSessionsRouter.get("/login", passport.authenticate("oauth2"))

githubUserSessionsRouter.get(
  "/handle-callback",
  passport.authenticate("oauth2", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/?page=1")
  },
)

export default githubUserSessionsRouter
