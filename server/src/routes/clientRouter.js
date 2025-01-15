import express from "express"

import getClientIndexPath from "../config/getClientIndexPath.js"

const clientRouter = new express.Router()

const clientRoutes = [
  "/",
  "/user-sessions/new",
  "/users/new",
  "/projects/:id",
  "/create-new-build",
  "/my-builds-list",
  "/my-builds/:id",
  "/edit-my-build/:id",
  "/fork-project/:id",
  "/project-forks/:id",
  "/github-login",
  "/project-list",
  "/search",
  "/how-to-use",
  "/404",
]
const authedClientRoutes = ["/profile"]

clientRouter.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath())
})

clientRouter.get(authedClientRoutes, (req, res) => {
  if (req.user) {
    res.sendFile(getClientIndexPath())
  } else {
    res.redirect("/user-sessions/new")
  }
})

export default clientRouter