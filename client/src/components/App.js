import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import "../assets/scss/main.scss"

import getCurrentUser from "../services/getCurrentUser"

import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import ProjectList from "./layout/ProjectList"
import MyBuildList from "./layout/MyBuildList"
import ProjectShow from "./layout/ProjectShow"
import NewProjectForm from "./layout/NewProjectForm"
import MyBuildShow from "./layout/MyBuildShow"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path={"/"}>
          <ProjectList user={currentUser} />
        </Route>
        <Route exact path={"/my-builds/:id/:projectTitle"}>
          <MyBuildShow user={currentUser} />
        </Route>
        <Route exact path={"/my-builds"}>
          <MyBuildList user={currentUser} />
        </Route>
        <Route exact path="/projects/:id">
          <ProjectShow user={currentUser} />
        </Route>
        <Route exact path="/create-new-build">
          <NewProjectForm user={currentUser} />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  )
}

export default hot(App)
