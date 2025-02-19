import React, { useState, useEffect } from "react"
import { TagProvider } from "../contexts/TagContext"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import "../assets/scss/main.scss"
import getCurrentUser from "../services/getCurrentUser"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import ProjectList from "./layout/ProjectList"
import SearchList from "./layout/SearchList"
import ProjectShow from "./layout/ProjectShow"
import NewProjectForm from "./layout/NewProjectForm"
import MyBuildList from "./layout/MyBuildList"
import MyBuildShow from "./layout/MyBuildShow"
import EditBuildForm from "./layout/EditBuildForm"
import ForkList from "./layout/ForkList"
import ForkProjectForm from "./layout/ForkProjectForm"
import GithubLogin from "./authentication/GithubLogin"
import About from "./layout/About"
import NotFound404 from "./layout/404NotFound"
import FilterByTag from "./layout/FilterByTag"
import HowToUse from "./layout/HowToUse"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [projectsPerPage, setProjectsPerPage] = useState(9)
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
    <TagProvider>
      <Router>
        <TopBar projectsPerPage={projectsPerPage} user={currentUser} />
        <FilterByTag />
        <Route exact path={"/"}>
          <ProjectList projectsPerPage={projectsPerPage} user={currentUser} />
        </Route>
        <Route exact path={"/how-to-use"}>
          <HowToUse user={currentUser} />
        </Route>
        <Route exact path={"/about"}>
          <About />
        </Route>
        <Route exact path={"/my-builds-list"}>
          <MyBuildList projectsPerPage={projectsPerPage} user={currentUser} />
        </Route>
        <Route exact path={"/project-forks/:parentProjectId"}>
          <ForkList projectsPerPage={projectsPerPage} user={currentUser} />
        </Route>
        <Route exact path={"/search"}>
          <SearchList projectsPerPage={projectsPerPage} user={currentUser} />
        </Route>
          <Route exact path="/projects/:id">
            <ProjectShow user={currentUser} />
          </Route>
          <Route exact path={"/my-builds/:id"}>
            <MyBuildShow user={currentUser} />
          </Route>
          <Route exact path="/github-login">
            <GithubLogin user={currentUser} />
          </Route>
          <Route exact path="/create-new-build">
            <NewProjectForm user={currentUser} />
          </Route>
          <Route exact path="/edit-my-build/:id">
            <EditBuildForm user={currentUser} />
          </Route>
          <Route exact path="/fork-project/:id">
            <ForkProjectForm user={currentUser} />
          </Route>
        <Route exact path="/404" component={NotFound404} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Router>
    </TagProvider>
  )
}

export default hot(App)
