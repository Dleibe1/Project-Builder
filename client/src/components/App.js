import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import LandingPage from "./layout/LandingPage"

import "../assets/scss/main.scss"

import getCurrentUser from "../services/getCurrentUser"

import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import ProjectList from "./layout/ProjectList"
import ProjectShow from "./layout/ProjectShow"
import NewProjectForm from "./layout/NewProjectForm"
import MyBuildList from "./layout/MyBuildList"
import MyBuildShow from "./layout/MyBuildShow"
import EditBuildForm from "./layout/EditBuildForm"
import ForkList from "./layout/ForkList"
import ForkProjectForm from "./layout/ForkProjectForm"
import GithubLogin from "./authentication/GithubLogin"
import HowToUse from "./layout/HowToUse"

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
          <LandingPage/>
        </Route>
        <Route exact path={"/how-to-use"}>
          <HowToUse user={currentUser} />
        </Route>
        <Route exact path={"/project-list/:pageNumber"}>
          <ProjectList user={currentUser} />
        </Route>
        <Route exact path="/projects/:id">
          <ProjectShow user={currentUser} />
        </Route>
        <Route exact path="/create-new-build">
          <NewProjectForm user={currentUser} />
        </Route>
        <Route exact path={"/my-builds"}>
          <MyBuildList user={currentUser} />
        </Route>
        <Route exact path={"/my-builds/:id"}>
          <MyBuildShow user={currentUser} />
        </Route>
        <Route exact path="/edit-my-build/:id">
          <EditBuildForm user={currentUser} />
        </Route>
        <Route exact path={"/project-forks/:id"}>
          <ForkList user={currentUser} />
        </Route>
        <Route exact path="/fork-project/:id">
          <ForkProjectForm user={currentUser} />
        </Route>
        <Route exact path="/github-login">
          <GithubLogin user={currentUser} />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  )
}

export default hot(App)
