import passport from "passport"
import strategy from "../authentication/localPassportStrategy.js"
import deserializeUser from "../authentication/deserializeUser.js"
import githubPassportStrategy from "../authentication/githubPassportStrategy.js"

const addPassport = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
}

passport.use(strategy)
passport.use(githubPassportStrategy)
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(deserializeUser)
export default addPassport
