import express from "express"

import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import projectsRouter from "./api/v1/projectsRouter.js"
import myBuildsRouter from "./api/v1/myBuildsRouter.js"
import imageUploadTestRouter from "./api/v1/imageUploadTestRouter.js"
import forkRouter from "./api/v1/forkRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/", clientRouter)
rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/projects", projectsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/my-builds", myBuildsRouter)
rootRouter.use ("/api/v1/project-forks", forkRouter)
rootRouter.use("/api/v1/image-uploading", imageUploadTestRouter)

export default rootRouter