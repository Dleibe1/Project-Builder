import session from "cookie-session"
import configuration from "../config.js"

const addExpressSession = (app) => {
  app.use(
    session({
      name: "project-builder-session",
      keys: [configuration.session.secret],
      resave: true,
      maxAge: configuration.maxAge,
      httpOnly: true,
    }),
  )
}

export default addExpressSession
