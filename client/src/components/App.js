import React, { useState, useEffect } from "react"
import { TagProvider } from "../contexts/TagContext"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import "../assets/scss/main.scss"
import getCurrentUser from "../services/getCurrentUser"
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import NavigationBar from "./navigation-bar/NavigationBar"
import ProjectList from "./project-list-pages/ProjectList"
import ForkList from "./project-list-pages/ForkList"
import SearchList from "./project-list-pages/SearchList"
import ProjectShow from "./show-pages/ProjectShow"
import MyBuildShow from "./show-pages/MyBuildShow"
import NewProjectForm from "./project-forms/NewProjectForm"
import MyBuildList from "./project-list-pages/MyBuildsList"
import EditBuildForm from "./project-forms/EditBuildForm"
import ForkProjectForm from "./project-forms/ForkProjectForm"
import About from "./information-pages/About"
import NotFound404 from "./information-pages/404NotFound"
import FilterByTag from "./shared/FilterByTag"
import HowToUse from "./information-pages/HowToUse"

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
        <NavigationBar projectsPerPage={projectsPerPage} user={currentUser} />
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
        <Route exact path={"/project-forks/:parentProjectId"}>
          <ForkList projectsPerPage={projectsPerPage} user={currentUser} />
        </Route>
        <Route exact path={"/search"}>
          <SearchList projectsPerPage={projectsPerPage} user={currentUser} />
        </Route>
        <Route exact path="/projects/:id">
          <ProjectShow user={currentUser} />
        </Route>
        <AuthenticatedRoute
          path="/my-builds-list"
          component={MyBuildList}
          projectsPerPage={projectsPerPage}
          user={currentUser}
        />
        <AuthenticatedRoute
          path="/my-builds/:id"
          component={MyBuildShow}
          user={currentUser}
        />
        <AuthenticatedRoute
          path="/create-new-build"
          component={NewProjectForm}
          user={currentUser}
        />
        <AuthenticatedRoute
          path="/edit-my-build/:id"
          component={EditBuildForm}
          user={currentUser}
        />
        <AuthenticatedRoute
          path="/fork-project/:id"
          component={ForkProjectForm}
          user={currentUser}
        />
        <Route exact path="/404" component={NotFound404} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Router>
    </TagProvider>
  )
}

export default hot(App)
