import express from "express"
import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import projectsRouter from "./api/v1/projectsRouter.js"
import myBuildsRouter from "./api/v1/myBuildsRouter.js"
import imageUploadRouter from "./api/v1/imageUploadRouter.js"
import projectForksRouter from "./api/v1/projectForksRouter.js"
import githubUserSessionsRouter from "./api/v1/githubUserSessionsRouter.js"
import searchRouter from "./api/v1/searchRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/", clientRouter)
rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/projects", projectsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/my-builds", myBuildsRouter)
rootRouter.use("/api/v1/project-forks", projectForksRouter)
rootRouter.use("/api/v1/image-upload", imageUploadRouter)
rootRouter.use("/api/v1/github-user-sessions", githubUserSessionsRouter)
rootRouter.use("/api/v1/search", searchRouter)

export default rootRouter
